sentientPOC.chat = (function () {
    var initChat = function (username) {
        //$("#SelectedUserIds").multiselect({ numberDisplayed: 1 });
        // Reference the auto-generated proxy for the hub.
        var chat = $.connection.Chat;
        // Create a function that the hub can call back to display messages.
        chat.client.addNewMessageToPage = function (name, message) {
            // Add the message to the page.
            $('#discussion').append('<li><strong>' + htmlEncode(name)
                + '</strong>: ' + htmlEncode(message) + '</li>');
        };
        chat.client.newMessage = function (name, message, roomId) {
            // Add the message to the page.
            $('#discussion').append('<li><strong>' + htmlEncode(name)
                + '</strong>: ' + roomId + " " + htmlEncode(message) + '</li>');
        };
        chat.client.isUserInRoom = function (users, roomId) {
            var usersSplit = users.split(";");
            $.each(usersSplit, function (key, value) {
                // are you in this list for this room?
                if (username === value) {
                    // you are part of this chat room
                    //Joining the room
                    // TODO: Open a new browser window
                    //chat.server.joinRoom(username, roomId);
                    windowObjectReference = window.open("/Chat/StartChat/?users=Joey;David;Alex&roomId=" + roomId, "Chat", "resizable,scrollbars,status");
                }
            });
        };
        $('#startchat').on("click", function () {
            windowObjectReference = window.open("/Chat/StartChat/?users=Joey;David;Alex", "Chat", "resizable,scrollbars,status");
        })
        // Get the user name and store it to prepend to messages.
        // Set initial focus to message input box.
        $('#message').focus();
        // Start the connection.
        $.connection.hub.start().done(function () {
            $('#sendmessage').click(function () {
                // Call the Send method on the hub.
                chat.server.send(username, $('#message').val());
                // Clear text box and reset focus Joeyfor next comment.
                $('#message').val('').focus();
            });
            //Joining a Room
            $('#join').click(function () {
                var items = [];
                $('#selectedItems option:selected').each(function () { items.push($(this).text()); });
                var usersToChatWith = items.join(';');

                //Joining the room
                chat.server.joinRoom(username, usersToChatWith, $('#room').val());
            });
            $('#sendprivate').click(function () {
                //Sending a message to just that room
                chat.server.sendMessageToRoom(username, $('#room').val(), $('#message').val());
            });
        });

    };

    var initialize = function (username) {
        initChat(username);
    };

    return {
        initialize: initialize
    };
})();
