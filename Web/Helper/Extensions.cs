using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using POC.Models;

namespace POC.Helper
{
    public static class Extensions
    {
        public static List<User> Users = new List<User> {
                new User { Id = 1, Description = "Alex" },
                new User { Id = 2, Description = "Joey" },
                new User { Id = 3, Description = "David" }
            };

        public static List<ChatHistory> ChatHistory = new List<ChatHistory>
        {
            new ChatHistory {CaseId = 1, ChatStart = DateTime.Now, Participants = "Joey;Alex", UserName = "Joey", UserNameWhoStarted = "Joey"}   
        };

        public static MvcHtmlString DisableIf(this MvcHtmlString htmlString, Func<bool> expression)
        {
            if (expression.Invoke())
            {
                var html = htmlString.ToString();
                const string disabled = "\"disabled\"";
                html = html.Insert(html.IndexOf(">",
                    StringComparison.Ordinal), " disabled= " + disabled);
                return new MvcHtmlString(html);
            }
            return htmlString;
        }

        public static string GetLoggedInUserName() {
            if (HttpContext.Current == null) {
                return string.Empty;
            }
            if (HttpContext.Current != null && !HttpContext.Current.Request.Cookies.AllKeys.Contains(Common.CookieKey)) {
                return string.Empty;
            }
            var cookie = HttpContext.Current.Request.Cookies[Common.CookieKey];
            return cookie == null ? string.Empty : cookie.Values[Common.ClaimsKeys.UserName.ToDescription()];
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
