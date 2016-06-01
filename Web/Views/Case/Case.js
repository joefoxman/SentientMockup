sentientPOC.case = (function () {
    var initSearchGrid = function () {
        var grid = $("#case-searchresults-grid").bootgrid({
            navigation: 2,
            rowCount: 100,
            formatters: {
                "button-edit": function (column, row) {
                    return "<button type=\"button\" class=\"btn btn-xs btn-primary command-edit\" data-row-id=\"" + row.Id + "\"><span class=\"fa fa-pencil\"></span></button> ";
                },
                "button-view-chatlog": function (column, row) {
                    return "<button type=\"button\" class=\"btn btn-xs btn-primary command-view-chatlog\" data-patient-name=\"" + row.patientname + "\" + data-row-id=\"" + row.chatlog + "\"><span class=\"fa fa-comments-o\"></span></button> ";
                }
            }
        }).on("loaded.rs.jquery.bootgrid", function () {
            grid.find(".command-edit").on("click", function (e) {
                location.href = "/case/edit?" + $.trim($(this).data("row-id"));
            });
            grid.find(".command-view-chatlog").on("click", function (e) {
                alert("This will be where you can view the chat log");
            });
        });
    };

    var initialize = function () {
        initSearchGrid();
    };

    return {
        initialize: initialize
    };
})();