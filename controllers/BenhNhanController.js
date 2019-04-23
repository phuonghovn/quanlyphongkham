var db = require('../models/dbconnection');
var mysql = require('mysql');

//create class
var BenhNhanController = {
    getDanhSachBenhNhan: function (req, res) {
        return new Promise((resolve, reject) => {
            var BenhNhan = db.query('SELECT * from benhnhan', function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // console.log(results);
                // res.render('benhnhan/danhsach', { BenhNhan: results })
                resolve (results);
            });
        })
    },
    postThemBenhNhan: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO benhnhan (HoTen, NamSinh, GioiTinh, DiaChi) VALUES (${mysql.escape(req.body.hoten)}, ${mysql.escape(req.body.namsinh)}, ${mysql.escape(req.body.gioitinh)}, ${mysql.escape(req.body.diachi)})`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/benhnhan');
            });
        })
    },
    getSuaBenhNhan: function (MaBN) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from benhnhan where MaBN = ${mysql.escape(MaBN)}`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // res.send(results);
                // res.render('benhnhan/sua', { BenhNhan: results })
                resolve (results);
            });
        })
    },
    getXoaBenhNhan: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO benhnhan (HoTen, NamSinh, GioiTinh, DiaChi) VALUES (${mysql.escape(req.body.hoten)}, ${mysql.escape(req.body.namsinh)}, ${mysql.escape(req.body.gioitinh)}, ${mysql.escape(req.body.diachi)})`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                // console.log(results);
                // res.render('benhnhan/danhsach', { BenhNhan: results })
                res.redirect('/benhnhan');
            });
        })
    },
};
module.exports = BenhNhanController;