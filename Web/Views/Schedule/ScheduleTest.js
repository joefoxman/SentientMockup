sentientPOC.scheduleTest = (function () {
    var initSchedulerPerson = function () {
        //scheduler.locale.labels.unit_tab = "SNP";
        //scheduler.locale.labels.section_custom = "Assigned to";
        scheduler.config.first_hour = 7;
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
            size: 10,//the number of units that should be shown in the view 
            step: 5  //the number of units that will be scrolled at once
        });

        //scheduler.config.lightbox.sections = [
        //    { name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
        //    { name: "custom", height: 23, type: "unit_id", options: null, map_to: "unit_id" }, //type should be the same as name of the tab
        //    { name: "time", height: 72, type: "time", map_to: "auto" }
        //];

        scheduler.init("scheduler_here", new Date(2014, 06, 30), "unit");

        scheduler.parse([
            { id: 1, text: "Case 1", start_date: "2014-06-30 14:00", end_date: "2014-06-30 17:00", unit_id: "1", snp_name: "SNP Jame Smith" },
            { id: 2, text: "Case 2", start_date: "2014-06-30 12:00", end_date: "2014-06-30 19:00", unit_id: "1", snp_name: "SNP Jame Smith" },
            { id: 3, text: "Case 3", start_date: "2014-06-30 09:00", end_date: "2014-06-30 10:00", unit_id: "1", snp_name: "SNP Jame Smith" },
            { id: 4, text: "Case 4", start_date: "2014-06-30 12:00", end_date: "2014-06-30 13:00", unit_id: "2", snp_name: "SNP John Williams" },
            { id: 5, text: "Case 5", start_date: "2014-06-30 13:00", end_date: "2014-06-30 16:00", unit_id: "2", snp_name: "SNP John Williams" },
            { id: 6, text: "Case 6", start_date: "2014-06-30 12:00", end_date: "2014-06-30 19:00", unit_id: "3", snp_name: "SNP David Miller" }
        ], "json");
    }

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
			    key: 10, label: "Dr. Elizabeth Taylor", open: false, children: [
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

    var initSchedule = function() {
        $("#expand-all").on("click", function () {
            scheduler.openAllSections();
            scheduler.updateView();
        });
        $("#collapse-all").on("click", function () {
            scheduler.closeAllSections();
            scheduler.updateView();
        });
        initSchedulerTimeline();

        sentientPOC.common.hideWait($("body"));
        
        scheduler.attachEvent("onBeforeLightbox", function (id) {
            var eventObj = scheduler.getEvent(id);
            $("#customLightBoxModal").find("#Title").val(eventObj.text);
            $("#customLightBoxModal").find("#StartDateTime").val(eventObj.start_date.toString());
            $("#customLightBoxModal").find("#EndDateTime").val(eventObj.end_date.toString());
            var physicianName = scheduler.getSection(eventObj.section_id);
            if (physicianName !== undefined && physicianName !== null) {
                $("#customLightBoxModal").find("#PhysicianName").css("display", "inline-block");
                $("#customLightBoxModal").find("#SnpName").css("display", "none");
                $("#customLightBoxModal").find("#PhysicianName").val(physicianName.label);
            } else {
                $("#customLightBoxModal").find("#PhysicianName").css("display", "none");
                $("#customLightBoxModal").find("#SnpName").css("display", "inline-block");
                // get SNP Name
                var snpName = eventObj.snp_name;
                $("#customLightBoxModal").find("#SnpName").val(snpName);
            }
        $("#customLightBoxModal").modal("show");
            return false;
        });
        //scheduler.config.multi_day = false;
        scheduler.updateView();
    }

    var initialize = function () {
        initSchedule();
    };

    return {
        initialize: initialize
    };
})();
