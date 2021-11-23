const mysqlc=require("mysql2");

//export out db module

const db_connection = mysqlc.createConnection({
        host:"localhost",
        user:"root",
        password:"shada1402BANA",
        database:"dbmanager"
    }).on("error", (err) => {
        console.log("Failed to connect to Database - ", err);
      });
    
    module.exports = db_connection;