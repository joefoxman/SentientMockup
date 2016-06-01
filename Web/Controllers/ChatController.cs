using System.Collections.Generic;
using System.Web.Mvc;
using POC.Models;

namespace POC.Controllers
{
    public class ChatController : Controller
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
            var users = new List<User>();
            users.Add(new Models.User { Id = 1, Description = "Alex" });
            users.Add(new Models.User { Id = 2, Description = "Joey" });
            users.Add(new Models.User { Id = 3, Description = "Bob" });
            users.Add(new Models.User { Id = 4, Description = "Kate" });
            users.Add(new Models.User { Id = 5, Description = "Tom" });
            return PartialView("UserList", users);
        }
    }
}