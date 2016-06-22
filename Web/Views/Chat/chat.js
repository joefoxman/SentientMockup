sentientPOC.chat = (function () {
    var initChat = function (username) {
        var windowWidth = 400;
        var windowHeight = 600;
        var chat = $.connection.Chat;
        window.onbeforeunload = function () {
            $.ajax({
                type: "POST",
                async: false,
                url: "/chat/DisconnectUser/?userName=" + username
            });
            chat.server.leavingRoom(username);
            $.connection.hub.stop();
        };

        chat.client.updateUserStatus = function (name, isOnline) {
            var statusClass = "badge-important";
            if (isOnline) {
                statusClass = "badge-success";
            }
            var userStatusLabel = $('.isonline[data-description="' + name + '"]');
            if (userStatusLabel.length > 0) {
                $(userStatusLabel).removeClass("badge-important").removeClass("badge-success").addClass(statusClass);
            }
            var usercheckbox = $('.user-checkbox[data-description="' + name + '"]');
            if(usercheckbox.length > 0) {
                $(usercheckbox).prop("disabled", !isOnline);
            }
        };

        chat.client.rejoinRoom = function(users, roomId, userWhoStartedChat) {
            window.open("/Chat/StartChat/?users=" + users + "&roomId=" + roomId + "&userWhoStartedChat=" + userWhoStartedChat, roomId, "scrollbars=1,menubar=1,toolbar=1,status=1,Location=yes,directories=yes,resizable=1,titlebar=1,width=" + windowWidth + ",height=" + windowHeight);
        }

        chat.client.addUserToRoom = function (usersInRoom, roomId, userWhoStartedChat) {
            window.open("/Chat/StartChat/?users=" + usersInRoom + "&roomId=" + roomId + "&userWhoStartedChat=" + userWhoStartedChat, roomId, "scrollbars=1,menubar=1,toolbar=1,status=1,Location=yes,directories=yes,resizable=1,titlebar=1,width=" + windowWidth + ",height=" + windowHeight);
        }

        $("#startchat").on("click", function () {
            var selectedUsers = "";
            var delim = "";
            $.each($(".user-checkbox"), function () {
                if ($(this).prop("checked")) {
                    selectedUsers += delim + $(this).attr("data-description");
                    delim = ";";
                }
            });
            if (selectedUsers === "") {
                $("#warningModal").find("#warningMessage").html("Please select a user to chat with.");
                $("#warningModal").modal("show");
            }
            else {
                var randomnumber = Math.floor((Math.random() * 100) + 1);
                window.open("/Chat/StartChat/?users=" + selectedUsers + "&UserWhoStartedChat=" + username, randomnumber,
                    "scrollbars=1,menubar=1,toolbar=1,status=1,Location=yes,directories=yes,resizable=1,titlebar=1,width=" + windowWidth + ",height=" + windowHeight);
            }
        });
        
        window.setRoomId = function (roomId, users, userwhostarted, starttime) {
            var alreadyexists = $("#chathistory option[value='" + roomId +"']");
            if (alreadyexists.length === 0) {
                var datavalues = 'data-roomid="' + roomId + '" data-users="' + users + '" data-userwhostartedchat="' + userwhostarted + '"';
                $("#chathistory").append('<option ' + datavalues + ' value="' + roomId + '">' + starttime + ' ' + users + ';' + userwhostarted + '</option>');
            }
        }
        
        $("#rejoin").on("click", function () {
            var selected = $("#chathistory").find("option:selected");
            var roomId = $(selected).attr("data-roomid");
            var users = $(selected).attr("data-users");
            var userWhoStartedChat = $(selected).attr("data-userwhostartedchat");
            if (roomId == null) {
                $("#warningModal").find("#warningMessage").html("Please Select a chat to rejoin.");
                $("#warningModal").modal("show");
            }
            else {
                window.open("/Chat/RejoinChat/?users=" + users + "&roomId=" + roomId + "&userWhoStartedChat=" + userWhoStartedChat, roomId,
                    "scrollbars=1,menubar=0,toolbar=0,status=0,Location=no,directories=no,resizable=1,titlebar=0,width" + windowWidth + ",height=" + windowHeight);
            }
        });

        //Start the connection.
        $.connection.hub.start().done(function (data) {
            $("#connectionid").html("Connection ID: " + data.id);
        });
    };

    var initialize = function (username) {
        initChat(username);
    };

    return {
        initialize: initialize
    };
})();
