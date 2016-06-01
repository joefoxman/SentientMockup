using System.Web.Optimization;

namespace POC
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jqueryBootgrid").Include(
                        "~/Scripts/jquery.bootgrid.js",
                        "~/Scripts/jquery.bootgrid.fa.js"));
            bundles.Add(new ScriptBundle("~/bundles/jquerycookie").Include(
                        "~/Scripts/jquery.cookie.js"));
            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                        "~/Scripts/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*",
                        "~/Scripts/jquery.unobtrusive-ajax.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/bootstrap-checkbox.js",
                      "~/Scripts/bootstrap-dialog.js",
                      "~/Scripts/bootstrap-multiselect.js"));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(
                        "~/Views/Shared/Layout.js",
                        "~/Views/Case/Case.js",
                        "~/Views/Case/CaseTabs.js",
                        "~/Scripts/waitMe.js",
                        "~/Scripts/jquery.maskedinput.js",
                        "~/Scripts/Custom/common.js",
                        "~/Scripts/Custom/notification.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap.css",
                        "~/css/font-awesome.css",
                        "~/Content/Tabs.css",
                        "~/Content/Site.css",
                        "~/Content/Notification.css",
                        "~/Content/waitMe.css",
                        "~/Content/bootstrap-multiselect.css",
                        "~/Content/toastr.css",
                        "~/Content/bootstrap-dialog.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
