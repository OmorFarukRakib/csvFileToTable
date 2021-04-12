$("#csvRoot").on("click", ".deleteRow", function () {
  // $("#csvRoot").DataTable().destroy();
  // let table = $("#csvRoot").DataTable({
  //   scrollY: 400,
  //   scrollX: true,
  //   scrollCollapse: true,
  // });
  var checkstr = confirm("Are you sure you want to delete this row?");

  if (checkstr == true) {
    // do your code
    //table.row($(this).parents("tr")).remove().draw();
    $("#csvRoot").DataTable().row($(this).parents("tr")).remove().draw();

    // Needs to create new instance of datatable as table has been updated
    // $("#csvRoot").DataTable().destroy();
    // $("#csvRoot").DataTable({
    //   bPaginate: false,
    //   destroy: true,
    //   scrollY: 300,
    //   scrollX: true,
    //   scrollCollapse: true,
    //   autoWidth: true,
    //   responsive: true,
    // });

    // Needs to re calculate the rows number and empty rows number Starts
    let totalData = $("#csvRoot").DataTable().data().count();
    let iColumns = $("#csvRoot thead th").length;
    let totalRow = totalData / iColumns;

    $("#TotalNumberOfTrackID").text(totalRow);
    $("#TotalNumberOfEmptyTrackID").text(totalRow);

    let totalEmptyRows = $("#csvRoot tr td:nth-child(2):empty").length;
    $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
    // Add serial No
    $("#csvRoot tr").each(function (index) {
      $(this).find("td:nth-child(1)").html(index);
    });
    // Needs to re calculate the rows number and empty rows number Ends
  } else {
    return false;
  }

  //Serial no Modify
  // var addSerialNumber = function () {
  //   $("#csvRoot tr").each(function (index) {
  //     $(this)
  //       .find("td:nth-child(1)")
  //       .html(index + 1);
  //   });
  // };
  // addSerialNumber();
});
