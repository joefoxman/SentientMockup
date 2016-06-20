sentientPOC.discussion = (function () {
    //function disableF5(e) {
    //     if ((e.which || e.keyCode) === 116 || (e.which || e.keyCode) === 82) {
    //         e.preventDefault();
    //     }
    //};

    var initDiscussion = function (roomId, userList, userWhoStartedChat, startChatDateTime, loggedInUser, userWhoRejoinedChat) {
        var windowWidth = 400;
        var windowHeight = 600;
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({ path: newurl }, '', newurl);
        }

        opener.setRoomId(roomId, userList, userWhoStartedChat, startChatDateTime);
        var chat = $.connection.Chat;
        //var chat = opener.getConnection();
        $.connection.hub.qs = "roomId=" + roomId;

        chat.client.addMessageToRoom = function (name, message, roomId, dateSent) {
            // Add the message to the page.
            $("#discussion").append("<li class='chat-datetime-li'><div><strong>" + htmlEncode(name) + "</strong>: <span class='chat-datetime'>" + htmlEncode(dateSent) + "</span></div>"
                + "</li><li class='chat-message-li'><div class='chat-message'>" + htmlEncode(message) + "</div></li>");

            var height = 0;
            $("li div").each(function () {
                height += parseInt($(this).height());
            });
            height += 10 + '';
            $("div").animate({ scrollTop: height });
        };

        // Reference the auto-generated proxy for the hub.
        //var chat = $.connection.Chat;
        $("#message").focus();

        // Start the connection.
        //$.connection.hub.start().done(function () {
        $.connection.hub.start().done(function (data) {
            $("#connectionid").html("Connection ID: " + data.id);
            chat.server.joinRoom(loggedInUser, roomId);
            if (loggedInUser === userWhoStartedChat || userWhoRejoinedChat !== "") {
                // broadcast to everybody to start their chat and open their windows
                chat.server.startChat(userList, roomId, userWhoStartedChat, userWhoRejoinedChat);
            };

            $("#message").keyup(function (e) {
                var code = e.keyCode ? e.keyCode : e.which;
                if (code === 13) { // Enter keycode
                    $("#send").click();
                }
            });

            $("#send").click(function () {
                var message = $("#message").val().trim();
                if (message === "") {
                    $("#message").focus();
                    return;
                }
                chat.server.sendToRoom(roomId, loggedInUser, message);
                $("#message").val("").focus();
            });
            $("#add").click(function () {
                var selected = $("#userstoadd").find("option:selected").val();
                if (selected == null) {
                    alert('Please choose a user to add to the conversation.')
                }
                else {
                    userList += ";" + selected
                    chat.server.joinChat(selected, roomId, userWhoStartedChat)
                    //window.open("/Chat/StartChat/?users=" + userList + "&UserWhoStartedChat=" + userWhoStartedChat, roomId,
                    //"scrollbars=1,menubar=0,toolbar=0,status=0,Location=no,directories=no,resizable=1,titlebar=0,width=" + windowWidth + ",height=" + windowHeight);
                }
            });
        });
    };

    function htmlEncode(value) {
        var encodedValue = $("<div />").text(value).html();
        return encodedValue;
    }

    var initialize = function (roomId, userList, userWhoStartedChat, startChatDateTime, loggedInUser, userWhoRejoinedChat) {
        initDiscussion(roomId, userList, userWhoStartedChat, startChatDateTime, loggedInUser, userWhoRejoinedChat);
    };

    return {
        initialize: initialize
    };
})();
