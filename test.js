var mysql = require('mysql');

function test(){
  return new Promise((resolve, reject) => {
    var db = mysql.createConnection({
      host: "46.101.6.7",
      user: "phuongho",
      password: "054rzF4iRi",
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
  })
}
function LayDuLieuDatabase(homepage) {
  return new Promise((resolve, reject) => {
    var conn = mysql.createConnection({
      host: '157.230.35.173',
      user: 'monty',
      password: '054rzF4iRi@98',
      database: 'toolmuamerc'
    });
    //kết nối.

    conn.connect(function (err) {
      //nếu có nỗi thì in ra
      if (err) reject(err.stack);
      //nếu thành công
      // console.log('Ket Noi Thanh Cong');
    });

    var query = conn.query(`SELECT linkpage FROM crawler WHERE status = 0 AND homepage = ${mysql.escape(homepage)}`, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });

    conn.end(function (err) {
      //
      if (err) reject(err.stack);
      //nếu thành công
      // console.log('Da dong ket noi');
    });
  })
}
async function test1(){
  await test()
}
test1();
