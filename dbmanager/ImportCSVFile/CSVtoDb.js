var csv=require("csvtojson");
var mysql      = require('mysql');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var storageFolderName = `${__dirname}\\UploadedFiles`
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
module.exports = readCsvFile;

async function readCsvFile(filePath){
    let csvData=await csv().fromFile(filePath);
    let tableName = path.parse(filePath).name;
 
    
    let currentTimeinEpoch = moment().valueOf();
    let fileName = `${storageFolderName}/${currentTimeinEpoch}`
    if (!fs.existsSync(storageFolderName)){
        await fs.mkdirSync(storageFolderName);
        fs.writeFileSync(`${fileName}.sql`,`\r\n`)
        fs.writeFileSync(`${fileName}.csv`,`File_ID,File_Name\r\n`)
    }else{
        fs.writeFileSync(`${fileName}.sql`,`\r\n`)
        fs.writeFileSync(`${fileName}.csv`,`File_ID,File_Name\r\n`)
    }

    let tableCheckQuery = `SHOW TABLES IN ${DB_NAME} WHERE Tables_in_${DB_NAME} = '${tableName}'`
    connection.query(tableCheckQuery,(err, result) => {
        if (err){
            logger.log({ level: "error", message: err });
            throw new Error(err)

       }else{
           if(result.length > 0){
            writeData(csvData,fileName,tableName,currentTimeinEpoch)
           }else{
            connection.query(`CREATE TABLE ${tableName}
            (File_ID INT NOT NULL AUTO_INCREMENT,  
            File_Name VARCHAR(50),
            PRIMARY KEY(File_ID)
            )`,
            (err, result) => {
                if (err){
                    logger.log({ level: "error", message: err });
                    throw new Error(err)
                }else{
                writeData(csvData,fileName,tableName,currentTimeinEpoch)
               }
            });
           }
       }
    })
}

function writeData(data,fileName,tableName,currentTimeinEpoch){
    data.map(async(row,index) => {
        let query = `INSERT INTO ${tableName} (File_Name) VALUES ("${row['File_Name']}");`
        fs.appendFileSync(`${fileName}.sql`,`${query}\r\n`);
        fs.appendFileSync(`${fileName}.csv`,`${row['File_Name']}}\r\n`);
        if(data.length -1 == index){
            let sqlData = await fs.readFileSync(`${fileName}.sql`).toString();
             connection.query(sqlData,  (err, result) => {
                if (err){
                    logger.log({ level: "error", message: err });
                    throw new Error(err)
                }else{
                   console.log(`SQL File Executed Successfully : ${currentTimeinEpoch}.sql`);
               }
            })
        }
    })
}


module.exports = readCsvFile;
