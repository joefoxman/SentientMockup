sentientPOC.chat = (function () {
    var initChat = function (username) {
        var chat = $.connection.Chat;
        var windowObjectReference;
        var windowWidth = 400;
        var windowHeight = 600;
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
                window.open("/Chat/StartChat/?users=Joey;David;Alex", roomId, "scrollbars=1,menubar=0,toolbar=0,status=0,Location=no,directories=no,resizable=1,titlebar=0,width=" + windowWidth + ",height=" + windowHeight);
            }
        };

        $("#startchat").on("click", function () {
            var randomnumber = Math.floor((Math.random() * 100) + 1);
            window.open("/Chat/StartChat/?users=Joey;David;Alex&UserWhoStartedChat=" + username, randomnumber, "scrollbars=1,menubar=0,toolbar=0,status=0,Location=no,directories=no,resizable=1,titlebar=0,width=" + windowWidth + ",height=" + windowHeight);
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
