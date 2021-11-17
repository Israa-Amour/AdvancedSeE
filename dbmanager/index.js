const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//require for our db module 

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3amourisraa",
    database: "dbmanager",
    multipleStatements: true
})
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB Connected');
    else
        console.log(err);
});
app.listen(3000, () => console.log("Server is on port 3000"));
app.get('/db/files', (req, res) => {
    mysqlConnection.query('SELECT * FROM files', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});
