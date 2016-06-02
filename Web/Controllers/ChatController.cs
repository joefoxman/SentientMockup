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
            return PartialView(chatViewModel);
        }

        [HttpGet]
        public PartialViewResult GetUserList()
        {
            var users = new List<User>
            {
                new User {Id = 1, Description = "Alex"},
                new User {Id = 2, Description = "Joey"},
                new User {Id = 3, Description = "Bob"},
                new User {Id = 4, Description = "Kate"},
                new User {Id = 5, Description = "Tom"}
            };
            return PartialView("UserList", users);
        }
        public PartialViewResult StartChat(string users, string roomId)
        {
            var discussionViewModel = new POC.Models.Discussion();
            discussionViewModel.Chatlog = new List<Chatlog>();
            discussionViewModel.Users = new List<User>();
            var splitUsers = users.Split(';');
            foreach(var user in splitUsers)
            {
                discussionViewModel.Users.Add(new User { Id = 1, Description = user });
            }

            discussionViewModel.LoggedInUser = POC.Helper.Extensions.GetLoggedInUserName();
            if (string.IsNullOrWhiteSpace(roomId))
            {
                discussionViewModel.RoomId = Guid.NewGuid();
            }
            else
            {
                discussionViewModel.RoomId = new Guid(roomId);
            }
            return PartialView("Discussion", discussionViewModel);
        }

    }
}