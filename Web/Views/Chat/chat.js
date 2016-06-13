sentientPOC.chat = (function () {
    var initChat = function (username) {
        var chat = $.connection.Chat;
        var windowWidth = 400;
        var windowHeight = 600;

        window.onbeforeunload = function () {
            $.ajax({
                type: "POST",
                async: false,
                url: "/chat/DisconnectUser/?userName=" + username
            });
            chat.server.leavingRoom(username);
            $.connection.hub.stop();
        };

        // TODO: Add this new chat to the list
        // TODO: Add new client function to receive server message to update list


        chat.client.updateUserStatus = function (name, isOnline) {
            var statusClass = "offline";
            if (isOnline) {
                statusClass = "online";
            }
            var userStatusLabel = $('.isonline[data-description="' + name + '"]');
            if (userStatusLabel.length > 0) {
                $(userStatusLabel).removeClass("offline").removeClass("online").addClass(statusClass);
            }
        };

        chat.client.isUserInRoom = function (users, roomId, userWhoStartedChat) {
            var usersSplit = users.split(";");
            var shouldOpenWindow = false;
            $.each(usersSplit, function (key, value) {
                if (value !== userWhoStartedChat) {
                    // are you in this list for this room?
                    if (username === value) {
                        shouldOpenWindow = true;
                    }
                }
            });
            if (shouldOpenWindow) {
                window.open("/Chat/StartChat/?users=" + users + "&roomId=" + roomId + "&userWhoStartedChat=" + userWhoStartedChat, roomId, "scrollbars=1,menubar=0,toolbar=0,status=0,Location=no,directories=no,resizable=1,titlebar=0,width=" + windowWidth + ",height=" + windowHeight);
            }
        };

        $("#startchat").on("click", function () {
            var selectedUsers = "";
            var delim = "";
            $.each($(".user-checkbox"), function () {
                if ($(this).prop("checked")) {
                    selectedUsers += delim + $(this).attr("data-description");
                    delim = ";";
                }
            });
            if(selectedUsers === "") {
                alert('Please select a user to chat with.');
            }
            else {
                var randomnumber = Math.floor((Math.random() * 100) + 1);
                window.open("/Chat/StartChat/?users=" + selectedUsers + "&UserWhoStartedChat=" + username, randomnumber, "scrollbars=1,menubar=0,toolbar=0,status=0,Location=no,directories=no,resizable=1,titlebar=0,width=" + windowWidth + ",height=" + windowHeight);
            }
        });

        window.setRoomId = function (roomId) {
            //alert("Room ID: " + roomId);
        }

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
