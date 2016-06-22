using System.Web.Optimization;

namespace POC
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/signalr").Include(
                        "~/Scripts/jquery.signalR-2.2.0.js",
                        "~/Scripts/Custom/notification.js"));

            bundles.Add(new ScriptBundle("~/bundles/calendar").Include(
                        "~/Scripts/Calendar/dhtmlxscheduler.js",
                        "~/Scripts/dhtmlxScheduler/dhtmlxscheduler-responsive.js",
                        "~/Scripts/Calendar/ext/dhtmlxscheduler_timeline.js",
                        "~/Scripts/Calendar/ext/dhtmlxscheduler_treetimeline.js",
                        "~/Scripts/Calendar/ext/dhtmlxscheduler_units.js",
                        "~/Scripts/Calendar/ext/dhtmlxscheduler_minical.js"));

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
                        "~/Views/Schedule/ScheduleTabs.js",
                        "~/Views/Chat/Chat.js",
                        "~/Views/Chat/Discussion.js",
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
                        "~/Content/bootstrap-dialog.css",
                        "~/Content/dhtmlxscheduler.css",
                        "~/Content/dhtmlxScheduler/dhtmlxscheduler-responsive.css",
                        "~/Content/dhtmlxScheduler/dhtmlxscheduler-responsive-classic.css"));

            #region Metronic
            bundles.Add(new StyleBundle("~/bundles/metronic-global-mandatory-css").Include(
                "~/Content/metronic/global/plugins/font-awesome/css/font-awesome.css",
                "~/Content/metronic/global/plugins/simple-line-icons/simple-line-icons.css",
                "~/Content/metronic/global/plugins/bootstrap/css/bootstrap.css",
                "~/Content/metronic/global/plugins/bootstrap-switch/css/bootstrap-switch.css"
                ));
            bundles.Add(new StyleBundle("~/bundles/metronic-global-theme-css").Include(
                "~/Content/metronic/global/css/components.css",
                "~/Content/metronic/global/css/plugins.css"
                ));
            bundles.Add(new StyleBundle("~/bundles/metronic-layout-theme-css").Include(
                "~/Content/metronic/layouts/layout/css/layout.css",
                "~/Content/metronic/layouts/layout/css/themes/darkblue.css",
                "~/Content/metronic/layouts/layout/css/custom.css"
                ));

            bundles.Add(new ScriptBundle("~/bundles/metronic-core-plugins-js").Include(
                "~/Content/metronic/global/plugins/jquery.min.js",
                "~/Content/metronic/global/plugins/bootstrap/js/bootstrap.js",
                "~/Content/metronic/global/plugins/js.cookie.min.js",
                "~/Content/metronic/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js",
                "~/Content/metronic/global/plugins/jquery-slimscroll/jquery.slimscroll.js",
                "~/Content/metronic/global/plugins/jquery.blockui.min.js",
                "~/Content/metronic/global/plugins/bootstrap-switch/js/bootstrap-switch.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/metronic-global-theme-js").Include(
                "~/Content/metronic/global/scripts/app.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/metronic-layout-theme-js").Include(
                "~/Content/metronic/layouts/layout/scripts/layout.js",
                "~/Content/metronic/layouts/layout/scripts/demo.js",
                "~/Content/metronic/layouts/global/scripts/quick-sidebar.js",
                "~/Views/Shared/LayoutMetronic.js"
                ));
            #endregion

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
