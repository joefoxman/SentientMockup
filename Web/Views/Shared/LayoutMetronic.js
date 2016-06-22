var sentientPOC = sentientPOC || {};

sentientPOC.layoutMetronic = (function () {
    var initChatUsers = function() {
        $.ajax({
                type: "GET",
                url: "/Chat/ChatUserList"
            })
            .error(function(data) {
                console.log(data);
            })
            .done(function(data) {
                $("#chat-user-list").html(data);
            });
    };

    var initialize = function () {
        //setTimeout($.ajaxSetup({
        //    beforeSend: function () {
        //        var cookie = $.cookie("CookieKey");
        //        if (cookie == undefined) {
        //            location.href = "/auth";
        //        }
        //    }
        //}), 5000);
        initChatUsers();
    };

    return {
        initialize: initialize
    };
})();