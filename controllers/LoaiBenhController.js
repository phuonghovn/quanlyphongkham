var db = require('../models/dbconnection');
var mysql = require('mysql');

//create class
var LoaiBenhController = {
    getLoaiBenh: function (req, res) {
        return new Promise((resolve, reject) => {
            var BenhNhan = db.query('SELECT * from loaibenh', function (error, results) {
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
    postThemLoaiBenh: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO loaibenh (TenLoaiBenh) VALUES (${mysql.escape(req.body.tenloaibenh)})`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/loaibenh');
            });
        })
    },
    getXoaLoaiBenh: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM loaibenh WHERE MaLoaiBenh = ${mysql.escape(req.params.MaLoaiBenh)}`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/loaibenh');
            });
        })
    },
    getSuaLoaiBenh: function (MaLoaiBenh) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from loaibenh where MaLoaiBenh = ${mysql.escape(MaLoaiBenh)}`;
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
    postSuaLoaiBenh: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `UPDATE loaibenh SET 
            TenLoaiBenh = ${mysql.escape(req.body.tenloaibenh)}
             WHERE MaLoaiBenh = ${mysql.escape(req.params.MaLoaiBenh)}`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/loaibenh');
            });
        })
    },
};
module.exports = LoaiBenhController;