sentientPOC.chat = (function () {
    var initChat = function (username) {
        var chat = $.connection.Chat;
        var windowObjectReference;

        chat.client.isUserInRoom = function (users, roomId, userStartedChat) {
            var usersSplit = users.split(";");
            var shouldOpenWindow = false;
            $.each(usersSplit, function (key, value) {
                if (value !== userStartedChat) {
                    // are you in this list for this room?
                    if (username === value) {
                        shouldOpenWindow = true;
                    }
                }
            });
            if (shouldOpenWindow) {
                window.open("/Chat/StartChat/?users=Joey;David;Alex&roomId=" + roomId, "Chat", "resizable,scrollbars,status");
            }
        };

        $("#startchat").on("click", function () {
            windowObjectReference = window.open("/Chat/StartChat/?users=Joey;David;Alex&UserWhoStartedChat=Alex", "Chat", "resizable,scrollbars,status");
        });

        // Start the connection.
        $.connection.hub.start().done(function () {
        });
    };

    var initialize = function (username) {
        initChat(username);
    };

    return {
        initialize: initialize
    };
})();
