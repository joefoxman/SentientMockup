﻿using System.Collections.Generic;
using System.Web.Mvc;
using POC.Models;

namespace POC.Helper
{
    public static class Extensions
    {
        public static SelectList GetMvcSelectListFromIEnumarable(this IEnumerable<User> listToConvert)
        {
            return new SelectList(listToConvert, "Id", "Description");
        }
    }
}