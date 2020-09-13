(function (window, $) {
    "use strict";
    $(".btn-delete").click(function () {
      var btn = $(this);
      var tr = btn.closest("tr");
      var itm = tr.data("crud");
      var modalDelete = $("#delete-crud");
      modalDelete.modal("show");
      $(".crud-name", modalDelete).html(itm.name);
      var upUrl = "/course/delete/" + itm._id;
      $("#confirm-delete-btn", modalDelete).attr("href", upUrl);
    });
  })(window, jQuery);