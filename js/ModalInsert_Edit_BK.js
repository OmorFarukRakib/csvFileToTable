// Implementing pop up model's data for editing
$(document).ready(function () {
  $("#csvRoot").on("click", ".editbtn", function () {
    row_index = $(this).closest("tr").index();
    console.log(`ata akhn click kora button er index: ${row_index}`);
    console.log("Press Hoise EDIT");
    var $tr = $(this).closest("tr");
    console.log($tr.html());
    var data = $tr
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    console.log(data);

    $("#ID_EDITID").val(data[0]);
    $("#deviceID_EDITID").val(data[1]);
    $("#deviceManufacturer_EDITID").val(data[2]);
    $("#deviceSerial_EDITID").val(data[3]);
    $("#deviceModel_EDITID").val(data[4]);
    $("#deviceRating_EDITID").val(data[5]);

    /// replace with existing row when submitted
    $("#EditForm").submit(function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var newEditedRow = "";
      console.log("SUBMIT HOISE MAMAA");
      var idEdit = $("input[name=IDEdit]").val();
      var deviceIDEdit = $("input[name=deviceIDEdit]").val();
      var deviceManufacturerEdit = $(
        "input[name=deviceManufacturerEdit]"
      ).val();
      var deviceSerialEdit = $("input[name=deviceSerialEdit]").val();
      var deviceModelEdit = $("input[name=deviceModelEdit]").val();

      //var deviceRatingEdit = $("#deviceRatingEdit option:selected").text();
      //var deviceRatingEdit = $("#deviceRatingEdit").find(":selected");
      var deviceRatingEdit = $("select[name=deviceRatingEdit] option")
        .filter(":selected")
        .val();
      console.log(deviceRatingEdit);
      newEditedRow = `<td class="table-data sorting_1" contenteditable="false">${idEdit}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceIDEdit}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceManufacturerEdit}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceSerialEdit}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceModelEdit}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceRatingEdit}</td>                                    
                              
                        <td>
                          <div class="actionOptions">
                            
                              <button class="editbtn btn btn-primary" data-toggle="modal" data-target="#editModal">Edit</button>
                            
                             
                              <button class="deleteRow btn btn-danger">Delete</button>
                           
                          </div>
                        </td>     `;
      console.log(
        "ata delete kret chai shuru" + $tr.html() + "ata delete krte chai sesh"
      );
      //$("#csvRoot tr:eq(row_index)").remove();
      //$("#csvRoot tr").eq(row_index).remove();
      // $("#csvRoot").DataTable().row($tr).remove().draw();
      // $("#csvRoot").DataTable().row($(this).parents("tr")).remove().draw();
      //$("#csvRoot").DataTable().row(row_index).remove().draw();
      //$('#csvRoot tbody tr::eq( row_index)').addClass("shouldBeDelete");
      // $(`#csvRoot tr:eq(${0})`).addClass("shouldBeDelete");
      console.log("ai row delete hbe: " + row_index + " hoise dlt???");
      console.log("SHURU " + newEditedRow + " SESH");
      //$("#csvRoot").DataTable().row(row_index).remove().draw();
      // $("#csvRoot").DataTable().destroy();
      // $("#csvRoot").DataTable({
      //   destroy: true,
      //   scrollY: 300,
      //   scrollX: true,
      //   scrollCollapse: true,
      //   autoWidth: true,
      //   responsive: true,
      // });
      // $("#csvRoot")
      //   .DataTable()
      //   .row.add($("<tr> " + newEditedRow + " </tr>"))
      //   .draw();

      // This might work for editing starts
      //var table = $("#csvRoot").DataTable();
      var temp = $("#csvRoot").DataTable().row(row_index).data();
      console.log("ata data before edit-> " + temp + " -> ");
      temp[0] = idEdit;
      temp[1] = deviceIDEdit;
      temp[2] = deviceManufacturerEdit;
      temp[3] = deviceSerialEdit;
      temp[4] = deviceModelEdit;
      temp[5] = deviceRatingEdit;
      console.log("ata data after edit-> " + temp + " -> ");
      var tableRow = row_index; // GET TABLE ROW NUMBER
      $("#csvRoot").dataTable().fnUpdate(temp[0], [tableRow], 0, true);
      $("#csvRoot").dataTable().fnUpdate(temp[1], [tableRow], 1, true);
      $("#csvRoot").dataTable().fnUpdate(temp[2], [tableRow], 2, true);
      $("#csvRoot").dataTable().fnUpdate(temp[3], [tableRow], 3, true);
      $("#csvRoot").dataTable().fnUpdate(temp[4], [tableRow], 4, true);
      $("#csvRoot").dataTable().fnUpdate(temp[5], [tableRow], 5, true);
      // This might work for editing ends
      // $("#csvRoot").DataTable().destroy();
      // $("#csvRoot").DataTable({
      //   destroy: true,
      //   bPaginate: false,
      //   scrollY: 300,
      //   scrollX: true,
      //   scrollCollapse: true,
      //   autoWidth: true,
      //   responsive: true,
      // });

      $("#editModalClose").click();

      $("input[name=deviceIDEdit]").val("");
      $("input[name=deviceManufacturerEdit]").val("");
      $("input[name=deviceSerialEdit]").val("");
      $("input[name=deviceModelEdit]").val("");
      $("#deviceRatingEdit").val("");
    });
  });
});

// Implementing pop up model's data for Deleting
$(document).ready(function () {
  $(".delete").on("click", function () {
    var $tr = $(this).closest("tr");

    var dataForEdit = $tr
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    console.log(dataForEdit);
    console.log("DELETE PRESS HOISEE");

    $("#ID_DELETEID").val(dataForEdit[0]);
  });
});

// For Inserting New Row
$(document).ready(function () {
  $("#InsertForm").submit(function (event) {
    // alert("Handler for .submit() called.");
    event.preventDefault();
    let time = new Date($.now());
    let id =
      time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    let deviceID = $("input[name=deviceID]").val();
    let deviceManufacturer = $("input[name=deviceManufacturer]").val();
    let deviceSerial = $("input[name=deviceSerial]").val();
    let deviceModel = $("input[name=deviceModel]").val();

    let deviceRating = $("#deviceRating option:selected");
    var NewROW = `<td class="table-data sorting_1" contenteditable="false"> ${id} </td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceID}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceManufacturer}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceSerial}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceModel}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${deviceRating.text()}</td>                                    
                              
                        <td>
                          <div class="actionOptions">
                            
                              <button class="editbtn btn btn-primary" data-toggle="modal" data-target="#editModal">Edit</button>
                            
                             
                              <button class="deleteRow btn btn-danger">Delete</button>
                           
                          </div>
                        </td>    `;

    $("#csvRoot")
      .DataTable()
      .row.add($("<tr> " + NewROW + " </tr>"))
      .draw();

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
    $("#closeInsertModal").click();

    $("input[name=deviceID]").val("");
    $("input[name=deviceManufacturer]").val("");
    $("input[name=deviceSerial]").val("");
    $("input[name=deviceModel]").val("");
    $("#deviceRating").val("");

    // scrolling to the bottom for every new row entry starts
    var $scrollBody = $($("#csvRoot").DataTable().table().node()).parent();
    $scrollBody.scrollTop($scrollBody.get(0).scrollHeight);
    // scrolling to the bottom for every new row entry ends

    // Needs to re calculate the rows number and empty rows number Starts
    let totalData = $("#csvRoot").DataTable().data().count();
    let iColumns = $("#csvRoot thead th").length;
    let totalRow = totalData / iColumns;

    $("#TotalNumberOfTrackID").text(totalRow);
    $("#TotalNumberOfEmptyTrackID").text(totalRow);

    let totalEmptyRows = $("#csvRoot tr td:first-child:empty").length;
    $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
    // Needs to re calculate the rows number and empty rows number Ends
  });
});

// For Editing Existing Row
// $(document).ready(function () {
//   $("#EditForm").submit(function (event) {
//     event.preventDefault();
//     console.log("SUBMIT HOISE MAMAA");

//     $("#editModalClose").click();
//   });
// });

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
