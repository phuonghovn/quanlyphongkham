var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "157.230.35.173",
    user: "monty",
    password: "054rzF4iRi@98",
    database: "quanlyphongkham"
    // host: "192.168.64.2",
    // user: "phuongho",
    // password: "",
    // database: "quanlyphongkham"
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