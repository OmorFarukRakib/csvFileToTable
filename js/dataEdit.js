// function listenForDoubleClick(element) {
//     element.contentEditable = true;
//     setTimeout(function() {
//       if (document.activeElement !== element) {
//         element.contentEditable = false;
//       }
//     }, 300);
//   }

//   $('#csvRoot').SetEditable({ $addButton: $('#addNewRow')});

$(document).ready(function () {
  $("#csvRoot").on("click", ".editbtn", function () {
    var currentTD = $(this).parents("tr").find("td");
    console.log("Ata crnt ID " + currentTD);
    if ($(this).html() == "Edit") {
      currentTD = $(this).parents("tr").find("td");
      $.each(currentTD, function () {
        $(this).prop("contenteditable", true);
        $(this).prop("className", "contentEditableStyle");
        $(".editbtn").prop("contenteditable", false);
        $(".deleteRow").prop("contenteditable", false);
        $(".editbtn").closest("td").removeClass("contentEditableStyle");
        $(".deleteRow").closest("td").removeClass("table-data");
      });
    } else {
      $.each(currentTD, function () {
        $(this).prop("contenteditable", false);
        $(this).removeClass("contentEditableStyle");
        $(this).prop("className", "table-data");
        $(".deleteRow")
          .closest("td")
          .removeClass(["table-data", "contentEditableStyle"]);
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
      });
    }
    $(".editbtn").closest("td").removeClass("table-data");
    // Needs to re calculate the rows number and empty rows number Starts
    let totalData = $("#csvRoot").DataTable().data().count();
    let iColumns = $("#csvRoot thead th").length;
    let totalRow = totalData / iColumns;

    $("#TotalNumberOfTrackID").text(totalRow);
    $("#TotalNumberOfEmptyTrackID").text(totalRow);

    let totalEmptyRows = $("#csvRoot tr td:first-child:empty").length;
    $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
    // Needs to re calculate the rows number and empty rows number Ends

    $(this).html($(this).html() == "Edit" ? "Save" : "Edit");
  });
  $(".editbtn").closest("td").removeClass("table-data");
  $("#csvRoot tbody tr td:last").removeClass("table-data");
});
