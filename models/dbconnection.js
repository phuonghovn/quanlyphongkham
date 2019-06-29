var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-02.cleardb.net",
    user: "be76b258261fc4",
    password: "8aa2fa47",
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