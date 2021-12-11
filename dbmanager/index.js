const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')
const db = require('./dbConnection');
const { register } = require('./controllers/registerController');
const routes = require('./routes');
app.use(express.json());
app.use(routes);
const logger = require('./logger')
const CSVtoSQL = require('./ImportCSVFile/CSVtoDb');
const SQLtoDB = require('./importSQLFile/SQLtoDb');

const prompt = require("prompt-sync")({ sigint: true });



//const File_Path = prompt("Enter file Path to import");
//CSVtoSQL(ImportCSVFile/test.csv)

db.connect((err) => {
    if (!err)
        console.log('DB Connected');
    else
        console.log(err);
        logger.log({ level: "error", message: err });
});

//CSVtoSQL(File_Path)

SQLtoDB('ImportSQLFile/test')

app.listen(3000, () => console.log("Server is on port 3000"));
app.get('/db/files', (req, res) => {
    db.query('SELECT * FROM files', (err, rows, fields) => {
        logger.log({ level: "info", message: "get files from db" });
        if (!err)
        
            res.send(rows)
        else
            console.log(err);
            logger.log({ level: "error", message: err });

    
            

    })
});
app.get('/db/user', (req, res) => {
    db.query('SELECT * FROM user', (err, rows, fields) => {
        logger.log({ level: "info",   message: "get user from db" });;
        if (!err)
        
            res.send(rows)
        else
            console.log(err);
            logger.log({ level: "error", message: err });
    })
});

//Delete According to file ID 
app.delete('/db/files/delete/:id',(req,res)=>{
     db.query("DELETE FROM files WHERE File_ID = ?", [req.body.File_ID], (err, rows, fields) => {
        logger.log({ level: "info", message: "delete" }); 
        if (!err)
            res.send(rows);
        else
            console.log(err);
    }); 
 });
//Adding new file 
app.post('/db/files/add', (req, res) => {
    db.query("INSERT INTO files(File_Name) values (?)", [req.body.File_Name], (err, rows, fields) => {
        logger.log({ level: "info", message: req.body });
        if (!err)
            res.send(rows);
        else{
            console.log(err);
            logger.log({ level: "error", message: err });
        }
    });
});
//update due id to file name 
app.put('/db/files/update', (req, res) => {
    let sql = "UPDATE files SET File_Name = ?  WHERE File_ID = ? ";
    db.query(sql, [req.body.File_Name, req.body.File_ID]);
    res.status(200).json("row edited");
    logger.log({ level: "info", message: req.body }); 

});

app.use(express.static("./public"))
// body-parser middleware use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
 
 
db.connect(function (err) {
    if (err) {
        logger.log({ level: "error", message: err.message });
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
 

 

//// register and login
    // Handling Errors
    app.use((err, req, res, next) => {
        logger.log({ level: "info", message: req.body });
        logger.log({ level: "error", message: err });
        // console.log(err);
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Internal Server Error";
        res.status(err.statusCode).json({
          message: err.message,
        });
    });
    
/////////////////////////////////////////////////////////////

