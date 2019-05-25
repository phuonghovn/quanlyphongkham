var db = require('../models/dbconnection');
var mysql = require('mysql');

//create class
var DonViController = {
    getDonVi: function (req, res) {
        return new Promise((resolve, reject) => {
            var DonVi = db.query('SELECT * from donvi', function (error, results) {
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
    postThemDonVi: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO donvi (TenDonVi) VALUES (${mysql.escape(req.body.tendonvi)})`;
            var DonVi = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/donvi');
            });
        })
    },
    getXoaDonVi: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM donvi WHERE MaDonVi = ${mysql.escape(req.params.MaDonVi)}`;
            var DonVi = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/donvi');
            });
        })
    },
    getSuaDonVi: function (MaDonVi) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from donvi where MaDonVi = ${mysql.escape(MaDonVi)}`;
            var DonVi = db.query(query, function (error, results) {
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
    postSuaDonVi: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `UPDATE donvi SET 
            TenDonVi = ${mysql.escape(req.body.tendonvi)}
             WHERE MaDonVi = ${mysql.escape(req.params.MaDonVi)}`;
            var DonVi = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/donvi');
            });
        })
    },
};
module.exports = DonViController;