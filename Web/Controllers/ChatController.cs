using System.Collections.Generic;
using System.Web.Mvc;
using POC.Models;
using System;
using System.Linq;
using Microsoft.AspNet.SignalR;
using POC.Helper;
using POC.Hubs;

namespace POC.Controllers
{
    public class ChatController : ControllerBase
    {
        [HttpPost]
        public JsonResult DisconnectUser(string userName)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            var loggedInUser = Helper.Extensions.GetLoggedInUserName();
            var foundUser = Helper.Extensions.Users.Find(a => a.Description == loggedInUser);
            if (foundUser != null) {
                foundUser.Online = false;
            }
            context.Clients.All.updateUserStatus(userName, false);
            return new JsonResult();
        }

        [HttpGet]
        public PartialViewResult Chat()
        {
            var userlist = new List<User>();
            foreach(var user in Helper.Extensions.Users)
            {
                userlist.Add(new User { Id = user.Id, Description = user.Description, Online = user.Online });
            }
            var chatViewModel = new Chat
            {
                SelectedUserIds = new List<string>(),
                Users = userlist
            };
            var loggedInUser = Extensions.GetLoggedInUserName();
            chatViewModel.Users.Remove(userlist.Find(a => a.Description.Equals(loggedInUser, StringComparison.OrdinalIgnoreCase)));
            return PartialView(chatViewModel);
        }

        private Discussion GetDiscussionViewModel(
            string users, 
            string roomId, 
            string userWhoStartedChat, 
            string userWhoRejoinedChat)
        {

            Discussion discussionViewModel;
            if (string.IsNullOrWhiteSpace(roomId))
            {
                discussionViewModel = new Discussion
                {
                    Chatlog = new List<Chatlog>(),
                    Users = new List<User>(),
                    LoggedInUser = Extensions.GetLoggedInUserName(),
                    UsersToAdd = Extensions.Users
                };
                discussionViewModel.Users = new List<User>();
                if (users != null)
                {
                    var splitUsers = users.Split(';');
                    foreach (var user in splitUsers)
                    {
                        discussionViewModel.Users.Add(new User { Id = 1, Description = user });
                    }
                    // don't forget to add the user who started the chat
                    discussionViewModel.Users.Add(new User { Id = 1, Description = userWhoStartedChat });
                    users += ";" + userWhoStartedChat;
                }
                discussionViewModel.StartChatDateTime = DateTime.Now;
                discussionViewModel.UserList = users;
                discussionViewModel.RoomId = Guid.NewGuid();
                discussionViewModel.UserWhoStartedChat = userWhoStartedChat;
                discussionViewModel.UserWhoRejoinedChat = userWhoRejoinedChat;
                Extensions.Discussions.Add(discussionViewModel);
                Extensions.ChatHistory.Add(new ChatHistory
                {
                    CaseId = 1,
                    ChatStart = discussionViewModel.StartChatDateTime,
                    RoomId = discussionViewModel.RoomId,
                    Participants = users,
                    UserName = discussionViewModel.LoggedInUser,
                    UserNameWhoStarted = discussionViewModel.UserWhoStartedChat,
                    UserNameWhoRejoined = discussionViewModel.UserWhoRejoinedChat
                });
            }
            else
            {
                discussionViewModel = Extensions.Discussions.FirstOrDefault(a => a.RoomId.Equals(new Guid(roomId)));
                if (discussionViewModel != null)
                {
                    discussionViewModel.LoggedInUser = Extensions.GetLoggedInUserName();
                }
            }
            return discussionViewModel;
        }

        public PartialViewResult StartChat(string users, string roomId, string userWhoStartedChat) {
            var discussionViewModel = GetDiscussionViewModel(users, roomId, userWhoStartedChat, "");
            return PartialView("Discussion", discussionViewModel);
        }

        public PartialViewResult RejoinChat(string users, string roomId, string userWhoStartedChat) {
            var discussionViewModel = GetDiscussionViewModel(users, roomId, userWhoStartedChat, Extensions.GetLoggedInUserName());
            return PartialView("Discussion", discussionViewModel);
        }
    }
}