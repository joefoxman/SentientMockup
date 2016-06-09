using System.Collections.Generic;
using System.Web.Mvc;
using POC.Models;
using System;
using Microsoft.AspNet.SignalR;
using POC.Hubs;

namespace POC.Controllers
{
    public class ChatController : ControllerBase
    {
        [HttPost]
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
            var loggedInUser = Helper.Extensions.GetLoggedInUserName();
            chatViewModel.Users.Remove(userlist.Find(a => a.Description.Equals(loggedInUser, StringComparison.OrdinalIgnoreCase)));
            return PartialView(chatViewModel);
        }

        public PartialViewResult StartChat(string users, string roomId, string userWhoStartedChat) {
            var discussionViewModel = new Discussion {
                Chatlog = new List<Chatlog>(),
                Users = new List<User>()
            };
            discussionViewModel.Users = new List<User>();
            if (users != null)  {
                var splitUsers = users.Split(';');
                foreach (var user in splitUsers) {
                    discussionViewModel.Users.Add(new User { Id = 1, Description = user });
                }
            }
            discussionViewModel.StartChat = DateTime.Now;
            discussionViewModel.UserList = users;
            discussionViewModel.LoggedInUser = Helper.Extensions.GetLoggedInUserName();
            discussionViewModel.RoomId = string.IsNullOrWhiteSpace(roomId) ? Guid.NewGuid() : new Guid(roomId);
            discussionViewModel.UserWhoStartedChat = userWhoStartedChat;

            return PartialView("Discussion", discussionViewModel);
        }

    }

    public class HttPostAttribute : Attribute
    {
    }
}