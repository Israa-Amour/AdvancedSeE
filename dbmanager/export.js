var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./dbConnection');
var Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

 
const tableName = prompt("Enter table u want to export 0 if don't want to export : ");
if (tableName){

var app = express();


app.get('/export-csv',function(req,res){
  db.query(`SELECT * FROM ${tableName}`, function (err,files, fields) {

    if (err) throw err;
    console.log("files:");
     
    const jsonfiles = JSON.parse(JSON.stringify(files));
    console.log(jsonfiles);
 
    // -> Convert JSON to CSV data
    const csvFields = ['File_ID', 'File_Name'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonfiles);
 
    console.log(csv);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", `attachment; filename=${tableName}.csv`);
 
     res.status(200).end(csv);
  
  });
});
db.query(`DESCRIBE ${tableName}`, function (err,files, fields) {
  console.log(files);  
  fs.writeFileSync("./txtSchema/Schema1", JSON.stringify(files));

});



 // http://127.0.0.1:3000/export-csv
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
}
else{
  console.log("thank u for using")}

module.exports = app;
