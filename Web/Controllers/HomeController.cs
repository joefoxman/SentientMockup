﻿using System.Web.Mvc;

namespace POC.Controllers
{
    public class HomeController : ControllerBase
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
    }
}