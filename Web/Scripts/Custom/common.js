sentientPOC.common = (function () {
    var getDateFromJson = function (jsonDate) {
        if (jsonDate == null) {
            return "";
        }
        // parse JSON formatted date to javascript date object
        var date = new Date(parseInt(jsonDate.substr(6)));
        var displayDate = $.datepicker.formatDate("mm/dd/yy", date);
        return displayDate;
    };
    var getDateFromString = function (inDate) {
        if (inDate == null || inDate === '') {
            return '';
        }
        var dt = new Date(inDate);
        var day = ("0" + dt.getDate()).slice(-2);
        var month = ("0" + (dt.getMonth() + 1)).slice(-2);

        return dt.getFullYear() + "-" + (month) + "-" + (day);
    };
    /*
    * Bind an event handler to an element only once.  For example, you can't add the
    * "click" event to button more than once.  This is not the same as the "one" function.
    * Note: Could probably be smarter to allow multiple events but not the same handler?
    */
    var bindOnce = function (eventName, elementName, handler) {
        $(elementName).off(eventName).on(eventName, handler);
    };

    /* Show the processing spinner.  Can be reworked (or new function) to allow customization. */
    var showWait = function (elem) {
        $(elem).waitMe({
            effect : "roundBounce",
            text: "Please wait...",
            bg : "rgba(255,255,255,0.75)",
            color : "#000"
        });
    };

    /* Hide the processing spinner. */
    var hideWait = function (elem) {
        $(elem).waitMe("hide");
    };

    return {
        bindOnce: bindOnce,
        showWait: showWait,
        hideWait: hideWait,
        getDateFromJson: getDateFromJson,
        getDateFromString: getDateFromString
    };
})();