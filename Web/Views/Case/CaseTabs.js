sentientPOC.caseTabs = (function () {
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
        $(".panel-collapse").css("display", "block");
        var docHeight = $(window).height() - windowOffset;
        $(tabs).css("height", docHeight + "px").css("overflow-y", "hidden");
        $(tabs).find(scrollContentSelector).css("overflow-y", "scroll"); //.css("overflow-x", "hidden");
        $(tabs).find(scrollContentSelector).css("overflow-y", "scroll"); //.css("overflow-x", "hidden");
        $(scrollContentSelector).height(docHeight - (tabsHeight + tabBodyHeaderHeight + tabContentOffset) + "px");
    };

    var initCaseTabs = function() {
        $(window).resize(function() {
            var tabs = $("#tabs").tabs();
            dynamicHeightTab($(tabs));
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
                if (tabName === "chat") {
                    //$("#SelectedUserIds").multiselect();
                }
            }
        });
    };

    var initialize = function () {
        initCaseTabs();
    };

    return {
        initialize: initialize
    };
})();
