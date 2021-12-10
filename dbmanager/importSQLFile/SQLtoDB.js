
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
const connection = require('.././dbConnection');
const logger = require('.././logger')
var DB_NAME = "dbmanager"

connection.connect((err) => {
    if (!err)
        console.log('DB Connected');
    else
        console.log(err);
        logger.log({ level: "error", message: err });

        
});
function writeData(filePath){
    console.log("file path....",filePath)
    let fileName = path.parse(filePath).name;
    let folderLocation = `${__dirname}/../ImportCSVFile/UploadedFiles/${fileName}`
    console.log("file name....",folderLocation)

            let sqlData = fs.readFileSync(`${folderLocation}.sql`).toString();
             connection.query(sqlData,  (err, result) => {
                if (err){
                    logger.log({ level: "error", message: err });
                    throw err;
               }else{
                   console.log(`Done`);
               }
            })  
}
module.exports = writeData;

