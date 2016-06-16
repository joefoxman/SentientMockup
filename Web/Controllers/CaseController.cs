using System;
using System.Collections.Generic;
using System.Web.Mvc;
using POC.DataHelper;
using POC.Models;

namespace POC.Controllers
{
    public class CaseController : ControllerBase
    {
        public ActionResult Index()
        {   
            return View(CaseData.GetCaseListData());
        }

        public ActionResult Add()
        {
            return View("Edit");
        }

        public ActionResult Search()
        {
            var caseSearchResults = CaseData.GetCaseListData();
            return View("Index", caseSearchResults);
        }

        public ActionResult Edit(Guid? id)
        {
            return View();
        }

        public ActionResult Details(Guid? id)
        {
            return PartialView(CaseData.GetCaseData());
        }
        public ActionResult PatientHistory(Guid? id)
        {
            return PartialView();
        }

        public ActionResult Procedure(Guid? id)
        {
            return PartialView();
        }

        public ActionResult Review(Guid? id)
        {
            return PartialView();
        }

        public ActionResult Chat(Guid? id)
        {
            return PartialView();
        }
    }
}