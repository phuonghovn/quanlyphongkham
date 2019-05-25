var db = require('../models/dbconnection');
var mysql = require('mysql');

//create class
var CachDungController = {
    getCachDung: function (req, res) {
        return new Promise((resolve, reject) => {
            var CachDung = db.query('SELECT * from cachdung', function (error, results) {
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
    postThemCachDung: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO cachdung (CachDung) VALUES (${mysql.escape(req.body.cachdung)})`;
            var CachDung = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/cachdung');
            });
        })
    },
    getXoaCachDung: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM cachdung WHERE MaCachDung = ${mysql.escape(req.params.MaCachDung)}`;
            var CachDung = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/cachdung');
            });
        })
    },
    getSuaCachDung: function (MaCachDung) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from cachdung where MaCachDung = ${mysql.escape(MaCachDung)}`;
            var CachDung = db.query(query, function (error, results) {
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
    postSuaCachDung: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `UPDATE cachdung SET 
            TenCachDung = ${mysql.escape(req.body.cachdung)}
             WHERE MaCachDung = ${mysql.escape(req.params.MaCachDung)}`;
            var CachDung = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/cachdung');
            });
        })
    },
};
module.exports = CachDungController;