var mysql = require('mysql');


var db = mysql.createConnection({
    host: "192.168.64.2",
    user: "phuongho",
    password: "",
    database: "quanlyphongkham"
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
  });

// connection.connect();

// module.exports = connection;

//create class
var BenhNhanController = {
//function to query all items
getAllItems: function (req, res) {
        
        //query the DB using prepared statement
        var results = db.query('SELECT * from benhnhan', function (error, results, fields) {
            //if error, print blank results
            if (error) {
                console.log(error); 
            }            
            else console.log(results)
        });
    },
};
// module.exports = BenhNhanController;
console.log(BenhNhanController.getAllItems());