// NEW MODAL AUTOFOCUS
$(document).ready(function () {
  $("#new-crud").on("shown.bs.modal", function () {
    $(this).find("#username").focus();
  });
});


// VIEW MODAL
(function (window, $) {
  "use strict";
  $(".btn-view").click(function () {
    var btn = $(this);
    var tr = btn.closest("tr");
    var itm = tr.data("crud");
    itm.createdAt = moment(itm.createdAt).format("LLL");
    itm.updatedAt = moment(itm.updatedAt).format("LLL");
    var modalView = $("#view-crud");
    modalView.modal("show");
    $('#username', modalView).html(itm.username);
    $('#user-role', modalView).html(itm.userRole);
    $('#created-at', modalView).text(itm.createdAt);
    $('#last-updated', modalView).text(itm.updatedAt);

    // EDIT BUTTON ON VIEW MODAL
    $(".edit-on-view").click(function () {
      modalView.modal('hide');
      itm.startDate = moment(itm.createdAt).format("YYYY-MM-DD");
      itm.endDate = moment(itm.updatedAt).format("YYYY-MM-DD");
      var modalUpdate = $("#update-crud");
      modalUpdate.modal("show");
      $('input[name="username"]', modalUpdate).val(itm.username);
      $('input[name="password"]', modalUpdate).val(itm.password);
      var upUrl = "/edit/user/" + itm._id;
      $("form", modalUpdate).attr("action", upUrl);
    });
  });
})(window, jQuery);



// EDIT MODAL
(function (window, $) {
  "use strict";
  $(".btn-edit").click(function () {
    var btn = $(this);
    var tr = btn.closest("tr");
    var itm = tr.data("crud");
    itm.createdAt = moment(itm.createdAt).format("YYYY-MM-DD");
    itm.updatedAt = moment(itm.updatedAt).format("YYYY-MM-DD");
    var modalUpdate = $("#update-crud");
    modalUpdate.modal("show");
    $('input[name="username"]', modalUpdate).val(itm.username);
    $('input[name="password"]', modalUpdate).val(itm.password);
    var upUrl = "/edit/user/" + itm._id;
    $("form", modalUpdate).attr("action", upUrl);
  });  
  // AUTOFOCUS FOR EDIT MODAL
  $("#update-crud").on("shown.bs.modal", function () {
    $(this).find("#username").focus();
  });
})(window, jQuery);


// DELETE CONFIRMATION MODAL
(function (window, $) {
  "use strict";
  $(".btn-delete").click(function () {
    var btn = $(this);
    var tr = btn.closest("tr");
    var itm = tr.data("crud");
    var modalDelete = $("#delete-crud");
    modalDelete.modal("show");
    $(".mark-crud", modalDelete).html(itm.username);
    var upUrl = "/delete/user/" + itm._id;
    $("#confirm-delete-btn", modalDelete).attr("href", upUrl);
  });
})(window, jQuery);


// MANAGE DATATABLE SORT ALPHABETICALLY
$(document).ready(function () {
  $(".zero-configuration").DataTable({
    displayLength: 50,
    columnDefs: [
      {
        type: "natural",
        targets: [0, 1, 2, 3],
      },
      { responsivePriority: 1, targets: [0,4] }
    ],
    responsive: true,
  });
  
  $(".dropdown-toggle").dropdown();
});



