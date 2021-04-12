$("#tableContainer").on("click", "#insert", function () {
  if ($("#csvRoot tbody tr td").hasClass("dataTables_empty") === true) {
    alert("No row to insert! Need existing row to insert new ones");
  } else {
    $(".editbtn").closest("td").removeClass("table-data");
    $("#csvRoot tbody tr td:last").removeClass("table-data");

    var str = $("#insertNo").val();
    console.log(str);

    $("#csvRoot tbody tr:nth-child(1)")
      .clone()
      .appendTo("#dummy tbody")
      .find(".table-data")
      .empty();
    var newRow = $("#dummy tbody tr:last").html();
    console.log("AITAA: " + newRow + "ATA sesh");
    console.log(newRow);
    if (str != "") {
      let i;
      for (i = 0; i < str; i++) {
        $("#csvRoot")
          .DataTable()
          .row.add($("<tr> " + newRow + " </tr>"))
          .draw();
      }
    } else {
      $("#csvRoot")
        .DataTable()
        .row.add($("<tr> " + newRow + " </tr>"))
        .draw();
    }
    $(".editbtn").closest("td").removeClass("table-data");
    document.getElementById("dummy").deleteRow(0);
    // Needs to create new instance of datatable as table has been updated
    $("#csvRoot").DataTable().destroy();
    $("#csvRoot").DataTable({
      destroy: true,
      scrollY: 300,
      scrollX: true,
      scrollCollapse: true,
      autoWidth: true,
      responsive: true,
    });
    $(".editbtn").closest("td").removeClass("table-data");
    $("#csvRoot tbody tr td:last").removeClass("table-data");
    // Needs to re calculate the rows number and empty rows number Starts
    let totalData = $("#csvRoot").DataTable().data().count();
    let iColumns = $("#csvRoot thead th").length;
    let totalRow = totalData / iColumns;

    $("#TotalNumberOfTrackID").text(totalRow);
    $("#TotalNumberOfEmptyTrackID").text(totalRow);

    let totalEmptyRows = $("#csvRoot tr td:first-child:empty").length;
    $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
    // Needs to re calculate the rows number and empty rows number Ends
    // $("#csvRoot").DataTable().data.reload().draw();
  }
});

// Adding new File
$(document).ready(function () {
  $("#ImportAnotherFileButton").click(function () {
    localStorage.setItem("newFile", "1");
    location.reload();
  });

  if (localStorage.getItem("newFile") === "1") {
    $("#startTrackingByFileButton").click();
    localStorage.setItem("newFile", "0");
    localStorage.setItem("UploadNewFile", "0");
  }
});
