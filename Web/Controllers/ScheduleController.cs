using System.Web.Mvc;

namespace POC.Controllers
{
    public class ScheduleController : ControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Calendar()
        {
            return PartialView();
        }

        public ActionResult Confirmation()
        {
            return PartialView();
        }
        
        public ActionResult TestCalendar()
        {
            return View();
        }
    }
}