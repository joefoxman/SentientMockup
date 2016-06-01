using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using POC.Models;

namespace POC.Helper
{
    public static class Extensions
    {
        public static string GetLoggedInUserName()
        {
            var currentSession = HttpContext.Current.Session;
            var loggedInUserName = currentSession["loggedinuser"].ToString();
            return loggedInUserName;
        }
        public static SelectList GetMvcSelectListFromIEnumarable(this IEnumerable<User> listToConvert)
        {
            return new SelectList(listToConvert, "Id", "Description");
        }

        public static MultiSelectList MakeMultiSelectList(IEnumerable<User> list)
        {
            return new MultiSelectList(list, "Id", "Description");
        }
    }
}
