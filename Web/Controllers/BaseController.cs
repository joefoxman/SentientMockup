using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using POC.Helper;

namespace POC.Controllers
{
    public abstract class ControllerBase : Controller
    {
        protected int LoggedInUserId => GetLoggedInUserId();

        protected string LoggedInUserName => GetValByKey(Common.ClaimsKeys.UserName.ToDescription());

        private int GetLoggedInUserId()
        {
            var id = GetValByKey(Common.ClaimsKeys.UserId.ToDescription());
            int idInt;
            int.TryParse(id, out idInt);
            return idInt;
        }

        private string GetValByKey(string key)
        {
            var cookie = Request.Cookies[Common.CookieKey];
            return cookie == null ? string.Empty : cookie.Values[key];
        }

        public void UpdateCookie(string key, string value)
        {
            var keyValues = new List<KeyValuePair<string, string>>()
        {
            new KeyValuePair<string, string>(key, value)
        };
            CreateCookieWithValues(keyValues);
        }

        private void CreateCookieWithValues(IEnumerable<KeyValuePair<string, string>> keyValuePairs)
        {
            var cookie = Request.Cookies[Common.CookieKey] ??
                            new HttpCookie(Common.CookieKey);
            var now = DateTime.Now;
            cookie.Expires = now.AddMinutes(Common.CookieExpiration);
            foreach (var item in keyValuePairs)
            {
                cookie.Values[item.Key] = item.Value;
                Response.Cookies.Add(cookie);
            }
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // make sure we don't get caught in a loop
            // if we are requesting the login page or the login page is logging in then exit now
            if (filterContext.Controller.ToString().EndsWith(".AuthController")
                && (filterContext.ActionDescriptor.ActionName == "Index" || filterContext.ActionDescriptor.ActionName == "Login"))
            {
                return;
            }
            if (GetLoggedInUserId() == 0)
            {
                // redirect to login page now
                filterContext.Result = new RedirectResult("/auth/");
            }
        }
    }
}