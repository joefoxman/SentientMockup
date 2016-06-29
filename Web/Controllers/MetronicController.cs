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

        [HttpGet]
        public ActionResult CaseBookTabs()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CaseBookTabs2()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CaseBookPills()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CaseTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ProcedureTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult DocumentsTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ChatTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ChatTab2()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ReviewTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ReportTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult BillingTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult PatientTab()
        {
            return View();
        }

        [HttpGet]
        public ActionResult PatientTab2()
        {
            return View();
        }

        [HttpGet]
        public ActionResult PatientTab3()
        {
            return View();
        }
    }
}