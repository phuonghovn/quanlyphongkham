var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "46.101.6.7",
    user: "phuongho",
    password: "054rzF4iRi",
    database: "quanlyphongkham"
  });
  
  connection.connect(function(err) {
    if (err) console.log (err.message) 
    else console.log("Connected!!!")
  });

  // connection.end(function(err) {
  //   if (err) throw err;
  //   console.log("Close!!!")
  // })

module.exports = connection;