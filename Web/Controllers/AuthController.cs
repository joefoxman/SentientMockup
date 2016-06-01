using System.Web.Mvc;
using POC.Helper;
using POC.Models;

namespace POC.Controllers
{
    public class AuthController : ControllerBase
    {
        public ActionResult Index()
        {
            return View("Login");
        }

        public ActionResult Login(Login login)
        {
            UpdateCookie(Common.ClaimsKeys.UserName.ToDescription(), login.Username);
            return RedirectToAction("Index", "Case");
        }

        public ActionResult LogOff()
        {
            return RedirectToAction("Index");
        }
    }
}