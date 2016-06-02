﻿using System.Collections.Generic;
using System.Web.Mvc;
using POC.Models;

namespace POC.Controllers
{
    public class ChatController : ControllerBase
    {
        public ActionResult Chat()
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
    }
}