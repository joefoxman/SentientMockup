var sentientPOC = sentientPOC || {};

sentientPOC.layout = (function () {
    var initToastr = function () {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "200",
            "hideDuration": "200",
            "timeOut": "2000",
            "extendedTimeOut": "500",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    };

    var initialize = function () {
        //setTimeout($.ajaxSetup({
        //    beforeSend: function () {
        //        var cookie = $.cookie(".AspNet.ApplicationCookie");
        //        if (cookie == undefined) {
        //            location.href = "/home";
        //        }
        //    }
        //}), 5000);
        initToastr();
    };

    return {
        initialize: initialize
    };
})();