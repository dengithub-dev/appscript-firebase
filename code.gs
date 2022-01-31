//get data in firebase den2 realtime
function put_data(data){
  var url_ = "your firebase url";
  var secret_ = "your secret key";
  var base = FirebaseApp.getDatabaseByUrl(url_, secret_)
  base.setData("items", data); //you can change the "items" depending on your choice
}

function get_data(){
    //spreadsheet 
    var db = SpreadsheetApp.openById("your spreadsheet id");
    var sheet = db.getSheetByName("sheet name");
    //Get the number of rows and columns which contain some content
    var [rows, columns] = [sheet.getLastRow(), sheet.getLastColumn()];
    //Get the data contained in those rows and columns as a 2 dimensional array
    var data = sheet.getRange(1, 1, rows, columns).getValues();
    var header = data[0];
    data.shift();
    var data_converted = data.map(function(row) {
      return header.reduce(function(o, h, i) {
        o[h] = row[i];
        return o;
      }, {});
    });
    //call function put_data
    update_data(data_converted);
}
