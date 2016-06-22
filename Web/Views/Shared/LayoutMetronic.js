var sentientPOC = sentientPOC || {};

sentientPOC.layoutMetronic = (function () {
    var initCheckBoxHandler = function () {
        $(".media").on("click", function () {
            var checkBox = $(this).find(".user-checkbox");
            //<span data-description="Alex" class="isonline badge badge-success">&nbsp;</span>
            if (!$(this).find(".media-status span").hasClass("badge-success")) {
                return;
            }

            if ($(checkBox).prop("checked")) {
                $(checkBox).prop("checked", false);
            } else {
                $(checkBox).prop("checked", true);
            }
            var anyChecked = false;
            $.each($(".user-checkbox"), function() {
                if ($(this).prop("checked")) {
                    anyChecked = true;
                    return;
                }
            });
            $("#startchat").prop("disabled", !anyChecked);
        });
    };

    var initChatUsers = function (username) {
        $.ajax({
                type: "GET",
                url: "/Chat/ChatUserList"
            })
            .error(function(data) {
                console.log(data);
            })
            .done(function(data) {
                $("#chat-user-list").html(data);
                $(".user-checkbox").css("float", "left").css("margin-right", "10px").css("margin-top", "15px");
                initCheckBoxHandler();
                $("#startchat").prop("disabled", true);
                sentientPOC.chat.initialize("@username");
            });
    };

    var initialize = function (username) {
        initChatUsers(username);
    };

    return {
        initialize: initialize
    };
})();