var db = require('../models/dbconnection');
var mysql = require('mysql');
var moment = require('moment');

var QuyDinhController = {
    getQuyDinh: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `
            Select *
            From thamso
            `
            db.query(query, function (error, results) {
                if (error) {
                    res.redirect('/');
                }
                resolve(results);
                // console.log(results)
            })
        })
    },
    postQuyDinh: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = 
            `UPDATE thamso SET 
            GiaTri = ${req.body.sobntoida}
            WHERE ThamSo = 'SoBenhNhanToiDa'`
            var query2 = `UPDATE thamso SET 
            GiaTri = ${req.body.tienkham}
            WHERE ThamSo = 'TienKham'`
            var query3 = `UPDATE thamso SET 
            GiaTri = ${req.body.muccanhbaothuoc}
            WHERE ThamSo = 'MucCanhBaoThuoc'`
            
            // res.send(query);
            db.query(query, function (error, results) {
                if (error) {
                res.send(error.message)
                }
            })
            db.query(query2, function (error, results) {
                if (error) {
                res.send(error.message)
                }
            })
            db.query(query3, function (error, results) {
                if (error) {
                res.send(error.message)
                }
            })
            res.redirect('/quydinh');
        })
    }
};

module.exports = QuyDinhController;