$(document).ready(function () {
  $(".zero-configuration").DataTable({
    displayLength: 50,
    columnDefs: [
        {
          type: "natural",
          targets: [0,1]
        },
        { responsivePriority: 1, targets: [ 0,2 ]}
    ],
    responsive: true
  });
});
