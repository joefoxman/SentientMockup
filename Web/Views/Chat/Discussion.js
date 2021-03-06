﻿sentientPOC.discussion = (function () {
    //function disableF5(e) {
    //     if ((e.which || e.keyCode) === 116 || (e.which || e.keyCode) === 82) {
    //         e.preventDefault();
    //     }
    //};

    var initDiscussion = function (roomId, userList, userWhoStartedChat, startChatDateTime, loggedInUser, userWhoRejoinedChat) {
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({ path: newurl }, "", newurl);
        }

        opener.setRoomId(roomId, userList, userWhoStartedChat, startChatDateTime);
        var chat = $.connection.Chat;
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

        chat.client.updateUserStatus = function (name, isOnline) {
            var statusClass = "offline";
            if (isOnline) {
                statusClass = "online";
            }
            var userStatusLabel = $('.isonline[data-description="' + name + '"]');
            if (userStatusLabel.length > 0) {
                $(userStatusLabel).removeClass("offline").removeClass("online").addClass(statusClass);
            }
            var usercheckbox = $('.user-checkbox[data-description="' + name + '"]');
            if (usercheckbox.length > 0) {
                $(usercheckbox).prop("disabled", !isOnline);
            }
        };

        // Reference the auto-generated proxy for the hub.
        $("#message").focus();

        // Start the connection.
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
                var selectedUsers = "";
                var delim = "";
                $.each($(".user-checkbox"), function () {
                    if ($(this).prop("checked")) {
                        selectedUsers += delim + $(this).attr("data-description");
                        delim = ";";
                    }
                });
                if (selectedUsers === "") {
                    $("#warningModal").find("#warningMessage").html("Please choose a user to add to the conversation.");
                    $("#warningModal").modal("show");
                }
                else {
                    chat.server.AddUserToRoom(selectedUsers, roomId);
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
