sentientPOC.scheduleTabs = (function () {
    var dynamicHeightTabRecursiveMarginFind = function(element, tabBodyHeaderHeight) {
        $(element).children().each(function() {
            var extraMarginTop = $(this).css("marginTop").replace("px", "");
            if (extraMarginTop !== undefined) {
                tabBodyHeaderHeight = parseInt(tabBodyHeaderHeight) + parseInt(extraMarginTop);
            }
            var extraMarginBottom = $(this).css("marginBottom").replace("px", "");
            if (extraMarginBottom !== undefined) {
                tabBodyHeaderHeight = parseInt(tabBodyHeaderHeight) + parseInt(extraMarginBottom);
            }
            if ($(element).children().length > 0) {
                tabBodyHeaderHeight = dynamicHeightTabRecursiveMarginFind($(this), tabBodyHeaderHeight);
            }
        });
        return tabBodyHeaderHeight;
    };
    var dynamicHeightTab = function(tabs) {
        var tabBodyHeaderHeight;
        $(tabs).find(".ui-tabs-panel.ui-widget-content.ui-corner-bottom").each(function(index) {
            if ($(this).css("display") !== "none") {
                var bodyContentHeader = $($(this).find(".tab-body-content-header"));
                tabBodyHeaderHeight = $(bodyContentHeader).height();
                // get all the children and add the margin-top and margin-bottom to it
                tabBodyHeaderHeight = parseInt(tabBodyHeaderHeight) + parseInt(dynamicHeightTabRecursiveMarginFind($(bodyContentHeader), 0));
            }
        });
        var tabsHeight = $(".ui-tabs-nav.ui-helper-reset.ui-helper-clearfix").height();
        var tabContentOffset = 30;
        var scrollContentSelector = ".tab-body-content-scroll";
        var windowOffset = 80;
        $("#tabs-top-row").css("margin-top", "0");
        //}

        $(".panel-collapse").css("display", "block");
        var docHeight = $(window).height() - windowOffset;
        $(tabs).css("height", docHeight + "px").css("overflow-y", "hidden");
        $(tabs).find(scrollContentSelector).css("overflow-y", "scroll").css("overflow-x", "hidden");
        $(scrollContentSelector).height(docHeight - (tabsHeight + tabBodyHeaderHeight + tabContentOffset) + "px");
    };
    var dynamicCalendar = function(tabs, schedulerObject) {
        var tabHeight = $(tabs).css("height").replace("px", "");
        var tabWidth = $(tabs).css("width").replace("px", "");
        $(schedulerObject).css("height", tabHeight - 100 + "px");
        $(schedulerObject).css("width", tabWidth - 50 + "px");

        var windowWidth = $(window).width();
        if (windowWidth >= 1200) {
            // large >= 1200px 
            $(".dhx_cal_data table td.dhx_matrix_scell.folder").css("width", "200px");
            $(".dhx_cal_data table td.dhx_matrix_scell.item").css("width", "200px");
            scheduler.matrix.timeline.x_size = 24;
            //scheduler.update_view();
        }
        else if (windowWidth >= 992 && windowWidth < 1200) {
            // medium >= 992
            $(".dhx_cal_data table td.dhx_matrix_scell.folder").css("width", "200px");
            $(".dhx_cal_data table td.dhx_matrix_scell.item").css("width", "200px");
            scheduler.matrix.timeline.x_size = 12;
            //scheduler.update_view();
        }
        else if (windowWidth >= 768 && windowWidth < 992) {
            // small >= 768
            $(".dhx_cal_data table td.dhx_matrix_scell.folder").css("width", "50px");
            $(".dhx_cal_data table td.dhx_matrix_scell.item").css("width", "50px");
            scheduler.matrix.timeline.x_size = 3;
            //scheduler.update_view();
        }
        else if (windowWidth < 768) {
            // x-small < 768
            $(".dhx_cal_data table td.dhx_matrix_scell.folder").css("width", "25px").css("height", "40px");
            $(".dhx_cal_data table td.dhx_matrix_scell.item").css("width", "25px").css("height", "40px");
            scheduler.matrix.timeline.x_size = 1;
            //scheduler.update_view();
        }
    };

    var initSchedulerBasic = function () {
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.init("scheduler_here", new Date(2016, 6, 13), "week");
        $.get("/schedule/load", function (data) {
            scheduler.parse(data.Data, "json");
        });
    };

    var initSchedulerPerson = function() {
        //scheduler.locale.labels.unit_tab = "SNP";
        //scheduler.locale.labels.section_custom = "Assigned to";
        scheduler.config.first_hour = 5;
        scheduler.config.last_hour = 25;
        scheduler.config.hour_date = "%h:%i %A";
        //scheduler.config.multi_day = true;
        scheduler.config.details_on_create = true;
        scheduler.config.details_on_dblclick = true;
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        //scheduler.templates.event_class = function (s, e, ev) { return ev.custom ? "custom" : ""; };
        scheduler.createUnitsView({
            name: "unit",
            property: "unit_id",
            list: [
                { key: 1, label: "SNP Jame Smith" },
                { key: 2, label: "SNP John Williams" },
                { key: 3, label: "SNP David Miller" }
            ],
            days: 3,
            size: 10, //the number of units that should be shown in the view 
            step: 5 //the number of units that will be scrolled at once
        });

        //scheduler.config.lightbox.sections = [
        //    { name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
        //    { name: "custom", height: 23, type: "unit_id", options: null, map_to: "unit_id" }, //type should be the same as name of the tab
        //    { name: "time", height: 72, type: "time", map_to: "auto" }
        //];

        scheduler.init("scheduler_here", new Date(2014, 6, 30), "unit");

        scheduler.parse([
            { id: 1, text: "Case 1", start_date: "2014-06-30 14:00", end_date: "2014-06-30 17:00", unit_id: "1", snp_name: "SNP Jame Smith", status: "transferred", color: "rgb(169,209,142)", textColor: "black" },
            { id: 2, text: "Case 2", start_date: "2014-06-30 12:00", end_date: "2014-06-30 19:00", unit_id: "1", snp_name: "SNP Jame Smith", status: "complete", color: "rgb(162,30,30)", textColor: "white" },
            { id: 3, text: "Case 3", start_date: "2014-06-30 09:00", end_date: "2014-06-30 10:00", unit_id: "1", snp_name: "SNP Jame Smith", status: "inprogress", color: "rgb(169,209,142)", textColor: "black" },
            { id: 4, text: "Case 4", start_date: "2014-06-30 12:00", end_date: "2014-06-30 13:00", unit_id: "2", snp_name: "SNP John Williams", status: "cancelled", color: "rgb(169,209,142)", textColor: "black" },
            { id: 5, text: "Case 5", start_date: "2014-06-30 13:00", end_date: "2014-06-30 16:00", unit_id: "2", snp_name: "SNP John Williams", status: "complete", color: "rgb(162,30,30)", textColor: "white" },
            { id: 6, text: "Case 6", start_date: "2014-06-30 12:00", end_date: "2014-06-30 19:00", unit_id: "3", snp_name: "SNP David Miller", status: "tentative", color: "rgb(166,166,166)" }
        ], "json");
    };

    var initSchedulerTimeline = function () {
        //scheduler.locale.labels.timeline_tab = "Physician";
        scheduler.locale.labels.section_custom = "Section";
        scheduler.config.details_on_create = true;
        scheduler.config.details_on_dblclick = true;
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";

        //===============
        //Configuration
        //===============	
        var elements = [ // original hierarhical array to display
			{
                key: 10, label: "Dr. Elizabeth Duncan (2 Active)", open: true, children: [
                   { key: 20, label: "Dr. Elizabeth Duncan" }
                ]
			},
			{
                key: 30, label: "Dr. Linda Brown (1 Active)", open: true, children: [
                   { key: 40, label: "Dr. Linda Brown" }
                ]
			},
			{
                key: 50, label: "Dr. Kate Moss (1 Active)", open: true, children: [
                   { key: 60, label: "Dr. Kate Moss" }
                ]
			},
            {
                key: 70, label: "Dr. Dian Fossey (2 Active)", open: true, children: [
                   { key: 80, label: "Dr. Dian Fossey" }
                ]
            }
        ];

        scheduler.createTimelineView({
            section_autoheight: false,
            name: "timeline",
            x_unit: "minute",
            x_date: "%h:%i %A",
            x_step: 30,  // when you scroll go by 30 minutes
            x_size: 24,  // 24 30 minute increments is 12 hours
            x_start: 14, // start at 7:00 AM
            x_length: 2, // 30 minute increments
            y_unit: elements,
            y_property: "section_id",
            render: "tree",
            folder_dy: 20,
            dy: 80,
            fit_events: true,
            last_hour: 24
        });
        //===============
        //Data loading
        //===============
        //scheduler.config.lightbox.sections = [
        //    { name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
        //    { name: "custom", height: 23, type: "timeline", options: null, map_to: "section_id" }, //type should be the same as name of the tab
        //    { name: "time", height: 72, type: "time", map_to: "auto" }
        //];

        scheduler.init("scheduler_here", new Date(2014, 5, 30), "timeline");
        scheduler.parse([
			{ start_date: "2014-06-30 09:00", end_date: "2014-06-30 12:00", text: "Case A-12458", section_id: 20, status: "In Progress", color: "rgb(84,130,53)" },
			{ start_date: "2014-06-30 10:00", end_date: "2014-06-30 16:00", text: "Case A-89411", section_id: 20, status: "Transferred", color: "rgb(169,209,142)", textColor: "black" },
			{ start_date: "2014-06-30 10:00", end_date: "2014-06-30 14:00", text: "Case A-64168", section_id: 20, status: "Complete", color: "rgb(162,30,30)", textColor: "white" },
			{ start_date: "2014-06-30 16:00", end_date: "2014-06-30 17:00", text: "Case A-46598", section_id: 20, status: "Scheduled", color: "rgb(65,113,156)" },

			{ start_date: "2014-06-30 12:00", end_date: "2014-06-30 20:00", text: "Case B-48865", section_id: 40, status: "Canceled", color: "rgb(189,208,233)", textColor: "black" },
			{ start_date: "2014-06-30 14:00", end_date: "2014-06-30 16:00", text: "Case B-44864", section_id: 40, status: "In Progress", color: "rgb(84,130,53)" },
			{ start_date: "2014-06-30 16:30", end_date: "2014-06-30 18:00", text: "Case B-46558", section_id: 40, status: "Tentative", color: "rgb(166,166,166)" },
			{ start_date: "2014-06-30 18:30", end_date: "2014-06-30 20:00", text: "Case B-45564", section_id: 40, status: "Canceled", color: "rgb(189,208,233)", textColor: "black" },

			{ start_date: "2014-06-30 08:00", end_date: "2014-06-30 12:00", text: "Case C-32421", section_id: 60, status: "In Progress", color: "rgb(84,130,53)" },
			{ start_date: "2014-06-30 14:30", end_date: "2014-06-30 16:45", text: "Case C-14244", section_id: 60, status: "Complete", color: "rgb(162,30,30)", textColor: "white" },

			{ start_date: "2014-06-30 09:20", end_date: "2014-06-30 12:20", text: "Case D-52688", section_id: 80, status: "Complete", color: "rgb(162,30,30)", textColor: "white" },
			{ start_date: "2014-06-30 11:40", end_date: "2014-06-30 16:30", text: "Case D-46588", section_id: 80, status: "In Progress", color: "rgb(84,130,53)" },
			{ start_date: "2014-06-30 12:00", end_date: "2014-06-30 18:00", text: "Case D-12458", section_id: 80, status: "In Progress", color: "rgb(84,130,53)" }
        ], "json");
    };

    var initScheduleTabs = function() {
        $(window).resize(function() {
            var tabs = $("#tabs").tabs();
            dynamicHeightTab($(tabs));
            dynamicCalendar(tabs, $("#scheduler_here"));
        });

        $("#tabs").tabs({
            beforeActivate: function(event, ui) {
                sentientPOC.common.showWait($("body"));
                return true;
            },
            create: function(event, ui) {
                sentientPOC.common.showWait($("body"));
            },
            activate: function (event, ui) {
            },
            select: function(event, ui) {
            },
            load: function (event, ui) {
                $("#expand-all").on("click", function () {
                    scheduler.openAllSections();
                    scheduler.updateView();
                });
                $("#collapse-all").on("click", function () {
                    scheduler.closeAllSections();
                    scheduler.updateView();
                });
                scheduler.clearAll();
                dynamicHeightTab($(this));
                sentientPOC.common.hideWait($("body"));
                var tabName = ui.tab.text().toLowerCase();
                if (tabName === "calendar") {
                    initSchedulerPerson();
                    initSchedulerTimeline();
                    var tabs = $("#tabs").tabs();
                    dynamicHeightTab($(tabs));
                    dynamicCalendar(tabs, $("#scheduler_here"));
                    //initSchedulerBasic();
                    //initResponsive($("#scheduler_here"));
                    scheduler.attachEvent("onBeforeTodayDisplayed", function () {
                        //any custom logic here
                        return true;
                    });

                    scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
                        //if (old_mode === mode) {
                        //    return true;
                        //}
                        ////any custom logic here
                        //if (mode === "timeline") {
                        //    initSchedulerTimeline();
                        //}
                        //else if (mode === "unit") {
                        //    initSchedulerPerson();
                        //}
                        //scheduler.updateView();
                        return true;
                    });

                    scheduler.attachEvent("onBeforeLightbox", function(id) {
                        var eventObj = scheduler.getEvent(id);
                        $("#customLightBoxModal").find("#Title").val(eventObj.text);
                        $("#customLightBoxModal").find("#StartDateTime").val(eventObj.start_date.toString());
                        $("#customLightBoxModal").find("#EndDateTime").val(eventObj.end_date.toString());
                        $("#customLightBoxModal").find("#Status").val(eventObj.status.toString());
                        var physicianName = scheduler.getSection(eventObj.section_id);
                        if (physicianName !== undefined && physicianName !== null) {
                            // get Physician Name
                            $("#customLightBoxModal").find("#PhysicianName").css("display", "inline-block");
                            $("#customLightBoxModal").find("#SnpName").css("display", "none");
                            $("#customLightBoxModal").find(".snpname-label").css("display", "none");
                            $("#customLightBoxModal").find("#PhysicianName").val(physicianName.label);
                        } else {
                            // get SNP Name
                            $("#customLightBoxModal").find("#PhysicianName").css("display", "none");
                            $("#customLightBoxModal").find(".physicianname-label").css("display", "none");
                            $("#customLightBoxModal").find("#SnpName").css("display", "inline-block");
                            var snpName = eventObj.snp_name;
                            $("#customLightBoxModal").find("#SnpName").val(snpName);
                        }
                        $("#customLightBoxModal").modal("show");
                        return false;
                    });
                    //scheduler.config.multi_day = false;
                    //scheduler.config.hour_date = "%h:%i %A";
                    scheduler.updateView();
                }
            }
        });
    };

    var initialize = function () {
        initScheduleTabs();
    };

    return {
        initialize: initialize
    };
})();
