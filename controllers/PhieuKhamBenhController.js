var db = require('../models/dbconnection');
var mysql = require('mysql');

//create class
var PhieuKhamBenhController = {
    getPhieuKhamBenh: function (req, res) {
        return new Promise((resolve, reject) => {
            var BenhNhan = db.query('SELECT * from phieukham', function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // console.log(results);
                // res.render('benhnhan/danhsach', { BenhNhan: results })
                resolve (results);
            });
        })
    }
};
module.exports = PhieuKhamBenhController;