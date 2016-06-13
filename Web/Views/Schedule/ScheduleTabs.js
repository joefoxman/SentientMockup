sentientPOC.scheduleTabs = (function () {
    var dynamicHeightTabRecursiveMarginFind = function(element, tabBodyHeaderHeight) {
        $(element).children().each(function() {
            var extraMarginTop = $(this).css("marginTop").replace('px', '');
            if (extraMarginTop !== undefined) {
                tabBodyHeaderHeight = parseInt(tabBodyHeaderHeight) + parseInt(extraMarginTop);
            }
            var extraMarginBottom = $(this).css("marginBottom").replace('px', '');
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
    var dynamicCalendar = function(tabs, scheduler) {
        var tabHeight = $(tabs).css("height").replace("px", "");
        var tabWidth = $(tabs).css("width").replace("px", "");
        $(scheduler).css("height", tabHeight - 100 + "px");
        $(scheduler).css("width", tabWidth - 50 + "px");
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
                dynamicHeightTab($(this));
            },
            activate: function (event, ui) {
            },
            select: function(event, ui) {
            },
            load: function(event, ui) {
                dynamicHeightTab($(this));
                sentientPOC.common.hideWait($("body"));
                var tabName = ui.tab.text().toLowerCase();
                if (tabName === "calendar") {
                    initScheduler();
                    dynamicCalendar($(this), $("#scheduler_here"));
                    //$.get("/schedule/load", function (data) {
                    //    scheduler.parse(data.Data, "json");
                    //});
                    //scheduler.init("scheduler_here", new Date(2016, 6, 13), "week");
                    //the time scale from 8AM to 8PM with 30 minutes step

                    //scheduler.locale.labels.timeline_tab = "Timeline";
                    //scheduler.locale.labels.section_custom = "Section";
                    //scheduler.config.details_on_create = true;
                    //scheduler.config.details_on_dblclick = true;
                    //scheduler.config.xml_date = "%Y-%m-%d %H:%i";

                    //scheduler.createTimelineView({
                    //    name: "timeline",
                    //    x_unit: "minute",
                    //    x_date: "%H:%i",
                    //    x_step: 30,
                    //    x_size: 24,
                    //    x_start: 16,
                    //    x_length: 48,
                    //    y_unit:
                    //       [{ key: 1, label: "Section A" },
                    //           { key: 2, label: "Section B" },
                    //           { key: 3, label: "Section C" },
                    //           { key: 4, label: "Section D" }],
                    //    y_property: "section_id",
                    //    render: "tree"
                    //});

                    //===============
                    //Configuration
                    //===============	

                    //var elements = [ // original hierarhical array to display
                    //    {
                    //        key: 10, label: "Web Testing Dep.", open: true, children: [
                    //           { key: 20, label: "Elizabeth Taylor" },
                    //           {
                    //               key: 30, label: "Managers", children: [
                    //                  { key: 40, label: "John Williams" },
                    //                  { key: 50, label: "David Miller" }
                    //               ]
                    //           },
                    //           { key: 60, label: "Linda Brown" },
                    //           { key: 70, label: "George Lucas" }
                    //        ]
                    //    },
                    //    {
                    //        key: 110, label: "Human Relations Dep.", open: true, children: [
                    //           { key: 80, label: "Kate Moss" },
                    //           { key: 90, label: "Dian Fossey" }
                    //        ]
                    //    }
                    //];

                    //scheduler.createTimelineView({
                    //    section_autoheight: false,
                    //    name: "timeline",
                    //    x_unit: "minute",
                    //    x_date: "%H:%i",
                    //    x_step: 30,
                    //    x_size: 24,
                    //    x_start: 16,
                    //    x_length: 48,
                    //    y_unit: elements,
                    //    y_property: "section_id",
                    //    render: "tree",
                    //    folder_dy: 20,
                    //    dy: 60
                    //});

                    ////===============
                    ////Data loading
                    ////===============
                    //scheduler.config.lightbox.sections = [
                    //    { name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
                    //    { name: "custom", height: 23, type: "timeline", options: null, map_to: "section_id" },
                    //    //type should be the same as name of the tab
                    //    { name: "time", height: 72, type: "time", map_to: "auto" }
                    //];

                    //scheduler.init("scheduler_here", new Date(2016, 06, 13), "timeline");

                    //scheduler.parse([
                    //    { start_date: "2016-06-13 09:00", end_date: "2016-06-13 12:00", text: "Task A-12458", section_id: 20 },
                    //    { start_date: "2016-06-13 10:00", end_date: "2016-06-13 16:00", text: "Task A-89411", section_id: 20 },
                    //    { start_date: "2016-06-13 10:00", end_date: "2016-06-13 14:00", text: "Task A-64168", section_id: 20 },
                    //    { start_date: "2016-06-13 16:00", end_date: "2016-06-13 17:00", text: "Task A-46598", section_id: 20 },

                    //    { start_date: "2016-06-13 12:00", end_date: "2016-06-13 20:00", text: "Task B-48865", section_id: 40 },
                    //    { start_date: "2016-06-13 14:00", end_date: "2016-06-13 16:00", text: "Task B-44864", section_id: 40 },
                    //    { start_date: "2016-06-13 16:30", end_date: "2016-06-13 18:00", text: "Task B-46558", section_id: 40 },
                    //    { start_date: "2016-06-13 18:30", end_date: "2016-06-13 20:00", text: "Task B-45564", section_id: 40 },

                    //    { start_date: "2016-06-13 08:00", end_date: "2014-06-13 12:00", text: "Task C-32421", section_id: 50 },
                    //    { start_date: "2016-06-13 14:30", end_date: "2014-06-13 16:45", text: "Task C-14244", section_id: 50 },

                    //    { start_date: "2016-06-13 09:20", end_date: "2014-06-13 12:20", text: "Task D-52688", section_id: 60 },
                    //    { start_date: "2016-06-13 11:40", end_date: "2014-06-13 16:30", text: "Task D-46588", section_id: 60 },
                    //    { start_date: "2016-06-13 12:00", end_date: "2014-06-13 18:00", text: "Task D-12458", section_id: 60 }
                    //], "json");

                    //dynamicCalendar($(this), $("#scheduler_here"));
                }
            }
        });
    };

    var initScheduler = function() {
        scheduler.locale.labels.timeline_tab = "Timeline";
        scheduler.locale.labels.section_custom = "Section";
        scheduler.config.details_on_create = true;
        scheduler.config.details_on_dblclick = true;
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";

        //===============
        //Configuration
        //===============	
        var elements = [ // original hierarhical array to display
			{
			    key: 10, label: "Dr. Elizabeth Taylor", open: true, children: [
                   { key: 20, label: "Dr. Elizabeth Taylor" }
			    ]
			},
			{
			    key: 30, label: "Dr. Linda Brown", open: false, children: [
                   { key: 40, label: "Dr. Linda Brown" }
			    ]
			},
			{
			    key: 50, label: "Dr. Kate Moss", open: false, children: [
                   { key: 60, label: "Dr. Kate Moss" }
			    ]
			},
            {
                key: 70, label: "Dr. Dian Fossey", open: false, children: [
                   { key: 80, label: "Dr. Dian Fossey" }
                ]
            }
        ];

        scheduler.createTimelineView({
            section_autoheight: false,
            name: "timeline",
            x_unit: "minute",
            x_date: "%H:%i",
            x_step: 30,
            x_size: 24,
            x_start: 12,
            x_length: 48,
            y_unit: elements,
            y_property: "section_id",
            render: "tree",
            folder_dy: 20,
            dy: 60,
            fit_events: true
        });

        //===============
        //Data loading
        //===============
        scheduler.config.lightbox.sections = [
            { name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
            { name: "custom", height: 23, type: "timeline", options: null, map_to: "section_id" }, //type should be the same as name of the tab
            { name: "time", height: 72, type: "time", map_to: "auto" }
        ];

        scheduler.init("scheduler_here", new Date(2014, 5, 30), "timeline");
        scheduler.parse([
			{ start_date: "2014-06-30 09:00", end_date: "2014-06-30 12:00", text: "Case A-12458", section_id: 20 },
			{ start_date: "2014-06-30 10:00", end_date: "2014-06-30 16:00", text: "Case A-89411", section_id: 20 },
			{ start_date: "2014-06-30 10:00", end_date: "2014-06-30 14:00", text: "Case A-64168", section_id: 20 },
			{ start_date: "2014-06-30 16:00", end_date: "2014-06-30 17:00", text: "Case A-46598", section_id: 20 },

			{ start_date: "2014-06-30 12:00", end_date: "2014-06-30 20:00", text: "Case B-48865", section_id: 40 },
			{ start_date: "2014-06-30 14:00", end_date: "2014-06-30 16:00", text: "Case B-44864", section_id: 40 },
			{ start_date: "2014-06-30 16:30", end_date: "2014-06-30 18:00", text: "Case B-46558", section_id: 40 },
			{ start_date: "2014-06-30 18:30", end_date: "2014-06-30 20:00", text: "Case B-45564", section_id: 40 },

			{ start_date: "2014-06-30 08:00", end_date: "2014-06-30 12:00", text: "Case C-32421", section_id: 60 },
			{ start_date: "2014-06-30 14:30", end_date: "2014-06-30 16:45", text: "Case C-14244", section_id: 60 },

			{ start_date: "2014-06-30 09:20", end_date: "2014-06-30 12:20", text: "Case D-52688", section_id: 80 },
			{ start_date: "2014-06-30 11:40", end_date: "2014-06-30 16:30", text: "Case D-46588", section_id: 80 },
			{ start_date: "2014-06-30 12:00", end_date: "2014-06-30 18:00", text: "Case D-12458", section_id: 80 }
        ], "json");
    };

    var initialize = function () {
        initScheduleTabs();
    };

    return {
        initialize: initialize
    };
})();
