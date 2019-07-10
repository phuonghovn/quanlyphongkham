var db = require('../models/dbconnection');
var mysql = require('mysql');

//create class
var ThuocController = {
    getThuoc: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `SELECT th.MaThuoc, th.TenThuoc, th.SoLuongConLai, th.MaDonVi, dv.TenDonVi, th.DonGia, th.MaCachDung, cd.CachDung
            FROM thuoc th, donvi dv, cachdung cd
            WHERE th.MaDonVi = dv.MaDonVi AND th.MaCachDung = cd.MaCachDung
            ORDER BY th.TenThuoc ASC`;
            var Thuoc = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // console.log(results);
                // res.render('benhnhan/danhsach', { Thuoc: results })
                resolve (results);
            });
        })
    },

    postThemThuoc: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO thuoc (TenThuoc, SoLuongConLai, MaDonVi, DonGia, MaCachDung, created_at, updated_at) VALUES
            (${mysql.escape(req.body.tenthuoc)}, ${mysql.escape(req.body.soluongnhap)}, 
            ${mysql.escape(req.body.donvi)}, ${mysql.escape(req.body.dongia)}, ${mysql.escape(req.body.cachdung)},
            Now(),Now())`
            var Thuoc = db.query(query, function (error, results) {
                //if error, print blank results
                console.log(query);
                if (error) {
                }
                // console.log(results);
                res.redirect('/Thuoc');
            });
        })
    },
    getXoaThuoc: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM thuoc WHERE MaThuoc = ${mysql.escape(req.params.MaThuoc)}`;
            var Thuoc = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                }
                res.redirect('/Thuoc');
            });
        })
    },
    getSuaThuoc: function (MaThuoc) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from thuoc where MaThuoc = ${mysql.escape(MaThuoc)}`;
            var Thuoc = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // res.send(results);
                // res.render('benhnhan/sua', { Thuoc: results })
                resolve (results);
            });
        })
    },
    postSuaThuoc: function (req, res) {
        return new Promise((resolve, reject) => {
    
            var query = `UPDATE thuoc SET
            TenThuoc = ${mysql.escape(req.body.tenthuoc)},
            SoLuongConLai = ${mysql.escape(req.body.soluongnhap)},
            MaDonVi = ${mysql.escape(req.body.donvi)},
            DonGia = ${mysql.escape(req.body.dongia)},
            MaCachDung =  ${mysql.escape(req.body.cachdung)}
            WHERE MaThuoc = ${mysql.escape(req.params.MaThuoc)}`;
            var Thuoc = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    
                }
                res.redirect('/thuoc');
            });
        })
    },
};
module.exports = ThuocController;