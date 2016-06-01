using System.Web.Mvc;
using POC.Models;

namespace POC.Controllers
{
    public class AuthController : Controller
    {
        public ActionResult Index()
        {
            return View("Login");
        }

        public ActionResult Login(Login login)
        {
            // persist the username to session for now
            Session.Add("loggedinuser", login.Username);
            return RedirectToAction("Index", "Case");
        }

        public ActionResult LogOff()
        {
            return RedirectToAction("Index");
        }
    }
}