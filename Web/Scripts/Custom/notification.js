sentientPOC.notification = (function () {
    var initNotificationClickHandler = function () {
        //$(".notification-item").on("click", function () {
        //    if (!$(this).hasClass("notification-item-new")) {
        //        return;
        //    }
        //    var notificationId = $(this).find("#notification_Id").val();
        //    $.ajax({
        //        type: "POST",
        //        url: "/Notification/SaveNotificationRead/?id=" + notificationId
        //    })
        //    .error(function (data) {
        //        console.log(data);
        //    })
        //    .done(function (data) {
        //        $("#notification-window").html(data);
        //        var newNotifications = $("#notification-window").find(".notification-item-new").length;
        //        $("#noti_Counter").text(newNotifications);
        //        if (newNotifications <= 0) {
        //            $("#noti_Counter").css("display", "none");
        //        }
        //        initNotificationClickHandler();
        //    });
        //});
    }

    var initNotificationTimer = function () {
        // go get the notification on a JQuery call and setup a 10 second timer for refresh
        $.ajax({
            type: "GET",
            url: "/chat/chat"
        })
        .error(function (data) {
            console.log(data);
        })
        .done(function (data) {
            $("#notification-window").html(data);
            var newNotifications = $("#notification-window").find(".notification-item-new").length;
            $("#noti_Counter").text(newNotifications);
            if (newNotifications > 0) {
                if (!$("#noti_Counter").is(":visible")) {
                    $("#noti_Counter")
                        .css({ opacity: 0 })
                        .text(newNotifications)
                        .css({ top: "-10px", display: "block" })
                        .animate({ top: "-2px", opacity: 1 }, 500);
                }
            } else {
                $("#noti_Counter").css("display", "none");
            }
            //initNotificationClickHandler();
            //setTimeout(initNotificationTimer, 5000);
        });
    }

    var initNotifications = function() {
        initNotificationTimer();

        $("#notification-close").on("click", function () {
            $("#notifications").hide();
        });

        $("#noti_Button").click(function () {
            // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
            $("#notifications").fadeToggle("fast", "linear", function () {
            });
            // HIDE THE COUNTER.
            //$("#noti_Counter").fadeOut("slow");                 
            return false;
        });

        // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
        $(document).click(function () {
            $("#notifications").hide();
        });

        $("#notifications").click(function (event) {
            event.stopPropagation();
            var i = 0;
            //return false; // DO NOTHING WHEN CONTAINER IS CLICKED.
        });
    };
    return {
        initNotifications: initNotifications
    };
})();