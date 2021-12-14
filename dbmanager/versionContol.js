// var csv=require("csvtojson");
var mysql      = require('mysql');
// var fs = require('fs');
// var path = require('path');
// var moment = require('moment');
// var storageFolderName = `${__dirname}\\UploadedFiles`
const prompt = require("prompt-sync")({ sigint: true });

const connection= require('./dbConnection');
const DB_NAME = 'test';
const version = prompt("Enter version : ");
  dataToDB('Test 2','1')
  getDataFromDB('Test2','1')
  version(`${version}`)


  
function getDataFromDB(File_Name,version){
    let select_query = `SELECT * from files where File_Name='${File_Name}' and version = '${version}' ORDER by File_ID desc LIMIT 1`;
    connection.query(select_query,(err, result) => {
        if (err){
            throw(err)
        }else{
            console.log(result)
        }
    })
}

function dataToDB(File_Name,version){
    let insert_query = `INSERT INTO files(File_Name,  version) VALUES ('${File_Name}','${version}')`;
    connection.query(insert_query,(err, result) => {
        if (err){
            throw(err)
        }else{
            console.log(result)
        }
    })
}

function versionControl(version){
    let delete_query = `DELETE FROM files  WHERE version !='${version}'`;
    connection.query(delete_query,(err, result) => {
        if (err){
            throw(err)
        }else{
            console.log(result)
        }
    })
}
