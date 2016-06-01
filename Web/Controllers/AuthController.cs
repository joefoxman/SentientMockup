using System.Web.Mvc;
using POC.DataHelper;
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
            return RedirectToAction("Index", "Case");
        }

        public ActionResult LogOff()
        {
            return RedirectToAction("Index");
        }
    }
}