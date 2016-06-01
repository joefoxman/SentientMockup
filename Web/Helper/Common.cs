using System;
using System.ComponentModel;

namespace POC.Helper
{
    public static class Common
    {
        public const string CookieKey = "CookieKey";
        public const int CookieExpiration = 30;

        public enum ClaimsKeys
        {
            [Description("userId")]
            UserId = 1,
            [Description("userName")]
            UserName = 2,
            [Description("userFullName")]
            UserFullName = 3
        }

        public static string ToDescription(this Enum value)
        {
            var da = (DescriptionAttribute[])(value.GetType().GetField(value.ToString())).GetCustomAttributes(typeof(DescriptionAttribute), false);
            return da.Length > 0 ? da[0].Description : value.ToString();
        }
    }
}