// (function (window, $) {
//   "use strict";
//   $(".btn-delete").click(function () {
//     let $btn = $(this);
//     let $tr = $btn.closest("tr");
//     let $itm = $tr.data("crud");
//     let $upUrl = "/course/delete/" + $itm._id;
//     let crudName = $itm.name;

//     $.confirm({
//       icon: "fa fa-trash-o",
//       closeIcon: true,
//       title: "<h4>Delete Confirmation</h4>",
//       content: `<p class="mb-2">Are you sure you want to permanently remove <b>${crudName}</b>?</p>`,
//       buttons: {
//         confirm: {
//           text: "Delete",
//           btnClass: "btn btn-danger",
//           keys: ["enter", "shift"],
//           action: function () {
//             window.location.href = $upUrl;
//           },
//         },
//         cancel: {
//           action: function () {},
//         },
//       },
//     });
//   });
// })(window, jQuery);
