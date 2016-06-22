using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace POC.Controllers
{
    public class MetronicController : Controller
    {
        // GET: Metronic
        [HttpGet]
        public ActionResult DashboardSNP()
        {
            return View();
        }

        [HttpGet]
        public ActionResult DashboardExecutive()
        {
            return View();
        }

        [HttpGet]
        public ActionResult DashboardClinical()
        {
            return View();
        }

        [HttpGet]
        public ActionResult DashboardIT()
        {
            return View();
        }

        [HttpGet]
        public ActionResult DashboardScheduler()
        {
            return View();
        }
    }
}