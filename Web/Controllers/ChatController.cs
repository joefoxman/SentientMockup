using System.Collections.Generic;
using System.Web.Mvc;
using POC.Models;
using System;

namespace POC.Controllers
{
    public class ChatController : ControllerBase
    {
        [HttpGet]
        public PartialViewResult Chat()
        {
            var users = new List<User>
            {
                new User {Id = 1, Description = "Alex"},
                new User {Id = 2, Description = "Joey"},
                new User {Id = 3, Description = "David"}
            };
            var chatViewModel = new Chat
            {
                SelectedUserIds = new List<string>(),
                Users = users
            };
            var loggedInUser = chatViewModel.LoggedInUser = Helper.Extensions.GetLoggedInUserName();
            foreach (var user in users) {
                if (user.Description == loggedInUser)
                {
                    users.Remove(user);
                }
                    }
            return PartialView(chatViewModel);
        }

        //[HttpGet]
        //public PartialViewResult GetUserList()
        //{
        //    var users = new List<User>
        //    {
        //        new User {Id = 1, Description = "Alex"},
        //        new User {Id = 2, Description = "Joey"},
        //        new User {Id = 3, Description = "Bob"},
        //        new User {Id = 4, Description = "Kate"},
        //        new User {Id = 5, Description = "Tom"}
        //    };

        //    return PartialView("UserList", users);
        //}
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

            discussionViewModel.LoggedInUser = Helper.Extensions.GetLoggedInUserName();
            discussionViewModel.RoomId = string.IsNullOrWhiteSpace(roomId) ? Guid.NewGuid() : new Guid(roomId);
            discussionViewModel.UserWhoStartedChat = userWhoStartedChat;

            return PartialView("Discussion", discussionViewModel);
        }

    }
}