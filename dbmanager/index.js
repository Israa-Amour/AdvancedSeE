const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')
//const popup = require('node-popup');
//require for our db module 
const db = require('./dbConnection');
const { register } = require('./controllers/registerController');
const routes = require('./routes');
app.use(express.json());
app.use(routes);

db.connect((err) => {
    if (!err)
        console.log('DB Connected');
    else
        console.log(err);
});
app.listen(3000, () => console.log("Server is on port 3000"));
app.get('/db/files', (req, res) => {
    db.query('SELECT * FROM files', (err, rows, fields) => {
        if (!err)
        
            res.send(rows)
        else
            console.log(err);
    })
});
app.get('/db/user', (req, res) => {
    db.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err)
        
            res.send(rows)
        else
            console.log(err);
    })
});

////////////////////////////
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
 
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
//! Routes start
 
//route for Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//@type   POST
// upload csv to database
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);

   
})

function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
  
            // Open the MySQL connection
            db.connect((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = 'INSERT INTO files (File_Name) VALUES ?';
                    db.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
             
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
  
    stream.pipe(csvStream);

    console.warn("data Saved");



    //////////////////////
//// register and log in

    // Handling Errors
    app.use((err, req, res, next) => {
        // console.log(err);
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Internal Server Error";
        res.status(err.statusCode).json({
          message: err.message,
        });
    });
    
 
//create connection
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))}
