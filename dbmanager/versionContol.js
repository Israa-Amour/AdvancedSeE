var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var connection = require('./dbConnection');
var Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });


dataToDB('TesT',"1")
getDataFromDB("1")

function getDataFromDB(version){
  let select_query = `SELECT * from files where version = '${version}' ORDER by File_ID desc LIMIT 1`;
  modifieDB(version)
  connection.query(select_query,(err, result) => {
      if (err){
          throw(err)
      }else{
          console.log(result)
      }
  })
}

function dataToDB(File_Name,version){
  let insert_query = `INSERT INTO files(File_Name, version) VALUES ('${File_Name}','${version}')`;
  connection.query(insert_query,(err, result) => {
      if (err){
          throw(err)
      }else{
          console.log(result)
      }
  })
}

function modifieDB(versionValue){
    var sql = `DELETE FROM files WHERE version != '${versionValue}'`;
    connection.query(sql,(err, result) => {
        if (err){
            throw(err)
        }else{
            console.log(result)
        }
    })
  }