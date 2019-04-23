var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "192.168.64.2",
    user: "phuongho",
    password: "",
    database: "quanlyphongkham"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
  });

  // connection.end(function(err) {
  //   if (err) throw err;
  //   console.log("Close!!!")
  // })

module.exports = connection;