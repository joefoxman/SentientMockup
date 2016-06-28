using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using POC.Models;

namespace POC.Controllers {
    public class ScheduleController : ControllerBase {
        public JsonResult Load() {
            var items = new List<ScheduleItem> {
                new ScheduleItem {Text = "Meeting Test 1", StartDate = "2016/06/13 10:00", EndDate = "2016/06/13 13:00"},
                new ScheduleItem {Text = "Meeting Test 2", StartDate = "2016/06/13 11:00", EndDate = "2016/06/13 15:00"}
            };
            var json = JsonConvert.SerializeObject(items);
            return Json(new
            {
                Data = json
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            var vm = new CalendarItem();
            return View("Calendar", vm);
        }


        public ActionResult Calendar()
        {
            var vm = new CalendarItem();
            return PartialView(vm);
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