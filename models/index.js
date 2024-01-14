 const mysql = require('mysql2');

 function connection(){
   const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'shahjalal555',
        database: 'fbbc'
    })
    return connection.promise();
 }

 module.exports = connection;