using System.Collections.Generic;
using System.Web.Mvc;
using POC.Models;

namespace POC.Controllers
{
    public class ChatController : Controller
    {
        public ActionResult Chat()
        {
            return PartialView();
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