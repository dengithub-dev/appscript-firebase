//get data in firebase and put it to google sheet
function firebase_get_data(){
  //firebase url and secret info
  var url_ = "your firebase url";
  var secret_ = "your secret key";
  //sheet info
  var db = SpreadsheetApp.openById("you spreadsheet id");
  var sheet = db.getSheetByName("sheet name");
  var base = FirebaseApp.getDatabaseByUrl(url_, secret_)
  var data = base.getData();
  var data_items = data.items; //you can change the main key depending on what you put in realtime db
  //loo the data items and append it in the sheet
  for (var i=0; i < data_items.length; i++){
    //suppossedly you have a header of name, age, address, and item, below is an example on how to get the item 
    sheet.appendRow([data_items[i]["name"],data_items[i]["age"],data_items[i]["address"],data_items[i]["item"]]);
  }
}

//get data in google sheet and put it to firebase realtime db
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
    put_data(data_converted);
}

function put_data(data){
  var url_ = "your firebase url";
  var secret_ = "your secret key";
  var base = FirebaseApp.getDatabaseByUrl(url_, secret_)
  base.setData("items", data); //you can change the "items" depending on your choice
}

//delete data in firebase using appscript
function firebase_delete_data(){
  var url_ = "your firebase url";
  var secret_ = "your secret key";
  var base = FirebaseApp.getDatabaseByUrl(url_, secret_);
  base.removeData("your main-key/your sub-key");
}
