function ExportToTable() {
  console.log("pressed");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
  /*Checks whether the file is a valid excel file*/
  if (regex.test($("#csvFileInput").val().toLowerCase())) {
    var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
    if ($("#csvFileInput").val().toLowerCase().indexOf(".xlsx") > 0) {
      xlsxflag = true;
    }
    /*Checks whether the browser supports HTML5*/
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        /*Converts the excel data in to object*/
        if (xlsxflag) {
          var workbook = XLSX.read(data, { type: "binary" });
        } else {
          var workbook = XLS.read(data, { type: "binary" });
        }
        /*Gets all the sheetnames of excel in to a variable*/
        var sheet_name_list = workbook.SheetNames;

        var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
        sheet_name_list.forEach(function (y) {
          /*Iterate through all sheets*/ /*Convert the cell value to Json*/ if (
            xlsxflag
          ) {
            var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
          } else {
            var exceljson = XLS.utils.sheet_to_row_object_array(
              workbook.Sheets[y]
            );
          }
          if (exceljson.length > 0 && cnt == 0) {
            BindTable(exceljson, "#csvRoot");
            cnt++;
          }
        });
        $("#csvRoot").show();
        //DATATABLE
        $(document).ready(function () {
          $("#csvRoot").DataTable({
            searching: false,
            ordering: false,
            bPaginate: false,
            destroy: true,
            scrollY: 300,
            scrollX: true,
            order: [1, "asc"],
            scrollCollapse: true,
          });
          let totalData = $("#csvRoot").DataTable().data().count();
          let iColumns = $("#csvRoot thead th").length;
          let totalRow = totalData / iColumns;

          $("#TotalNumberOfTrackID").text(totalRow);

          let totalEmptyRows = $("#csvRoot tr td:first-child:empty").length;
          $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
        });
        //DATATABLE
      };
      if (xlsxflag) {
        /*If excel file is .xlsx extension than creates a Array Buffer from excel*/
        reader.readAsArrayBuffer($("#csvFileInput")[0].files[0]);
      } else {
        reader.readAsBinaryString($("#csvFileInput")[0].files[0]);
      }
    } else {
      alert("Sorry! Your browser does not support HTML5!");
    }
  } else {
    alert("Please upload a valid Excel file!");
  }
}

function BindTable(jsondata, tableid) {
  console.log(jsondata);
  /*Function used to convert the JSON array to Html Table*/
  var columns = BindTableHeader(
    jsondata,
    tableid
  ); /*Gets all the column headings of Excel*/
  var finalrow$ = $("<tbody/>");
  for (var i = 0; i < jsondata.length; i++) {
    var row$ = $("<tr/>");
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = jsondata[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append(
        `<td class="table-data" contenteditable="false">` + cellValue + `</td>`
      );
    }
    row$.append(` <td> <div class="actionOptions">
                        
                        <button class="editbtn btn btn-primary" data-toggle="modal" data-target="#editModal">Edit</button>
                            
                             
                              <button class="deleteRow btn btn-danger">Delete</button>
                     
                    </div> </td> </tr>`);
    finalrow$.append(row$);
  }
  $(tableid).append(finalrow$);
}
function BindTableHeader(jsondata, tableid) {
  /*Function used to get all column names from JSON and bind the html table header*/
  var columnSet = [];
  var finalheaderTr$ = $("<thead/>");
  var headerTr$ = $("<tr/>");
  for (var i = 0; i < jsondata.length; i++) {
    var rowHash = jsondata[i];
    for (var key in rowHash) {
      if (rowHash.hasOwnProperty(key)) {
        if ($.inArray(key, columnSet) == -1) {
          /*Adding each unique column names to a variable array*/
          columnSet.push(key);
          headerTr$.append($("<th/>").html(key));
        }
      }
    }
  }
  headerTr$.append($("<th/>").html("action"));
  finalheaderTr$.append(headerTr$);
  $(tableid).append(finalheaderTr$);
  return columnSet;
}
