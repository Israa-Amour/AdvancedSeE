// var csv=require("csvtojson");
var mysql      = require('mysql');
// var fs = require('fs');
// var path = require('path');
// var moment = require('moment');
// var storageFolderName = `${__dirname}\\UploadedFiles`
const connection= require('./dbConnection');
const DB_NAME = 'test';

  dataToDB('Test 1','1')
  getDataFromDB('Test1','1')
  deleteData('1')

function getDataFromDB(File_Name,version){
    let select_query = `SELECT * from test where File_Name='${File_Name}' and version = '${version}' ORDER by File_ID desc LIMIT 1`;
    connection.query(select_query,(err, result) => {
        if (err){
            throw(err)
        }else{
            console.log(result)
        }
    })
}

function dataToDB(File_Name,version){
    let insert_query = `INSERT INTO test(File_Name,  version) VALUES ('${File_Name}','${version}')`;
    connection.query(insert_query,(err, result) => {
        if (err){
            throw(err)
        }else{
            console.log(result)
        }
    })
}

function deleteData(version){
    let delete_query = `DELETE FROM test  WHERE version !='${version}'`;
    connection.query(delete_query,(err, result) => {
        if (err){
            throw(err)
        }else{
            console.log(result)
        }
    })
}
