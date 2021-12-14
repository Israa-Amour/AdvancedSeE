const mysql=require("mysql2");
const prompt = require("prompt-sync")({ sigint: true });

//export out db module
const hostName = prompt("Enter Host Name to connect : ");
const userName  = prompt("Enter user name to import  : ");
const password  = prompt("Enter password : ");
const databaseName = prompt("Enter database name : ");
console.log(`Your host name is ${hostName} and user name is ${userName} and password is ${password} and database name ${databaseName}`)

<<<<<<< HEAD
const db_connection = mysqlc.createConnection({

=======
const db_connection = mysql.createConnection({
>>>>>>> 8eb59c914e5cdb34241ea82222cf70f51cc7fce9
        host:`${hostName}`,
        user:`${userName}`,
        password:`${password}`,
        database:`${databaseName}`,

        multipleStatements: true // Important for SQL File Execution

    }).on("error", (err) => {
        console.log("Failed to connect to Database - ", err);
        logger.log({ level: "error", message: err });
      });
    
    module.exports = db_connection;



        //host:"localhost",
      //  user:"root",
    //    password:"shada1402BANA",
  //      database:"dbmanager",
