var db = require('../models/dbconnection');
var mysql = require('mysql');
var moment = require('moment');
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
                resolve(results);
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
                resolve(results);
            });
        })
    },
    postSuaBenhNhan: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `UPDATE benhnhan SET 
            HoTen = ${mysql.escape(req.body.hoten)}, NamSinh = ${mysql.escape(req.body.namsinh)}, GioiTinh = ${mysql.escape(req.body.gioitinh)}, DiaChi = ${mysql.escape(req.body.diachi)}
             WHERE MaBN = ${mysql.escape(req.params.MaBN)}`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {

                }
                res.redirect('/benhnhan');
            });
        })
    },
    getXoaBenhNhan: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM benhnhan WHERE MaBN = ${mysql.escape(req.params.MaBN)}`;
            var BenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {

                }
                res.redirect('/benhnhan');
            });
        })
    },
    getTraCuuBenhNhan: function (req, res) {
        return new Promise((resolve, reject) => {
            var query = `SELECT pk.MaBN, bn.HoTen, lb.TenLoaiBenh, pk.NgayKham, pk.TrieuChung
            FROM phieukham pk, benhnhan bn, loaibenh lb
            WHERE   pk.MaBN = bn.MaBN AND
                    pk.MaLoaiBenh = lb.MaLoaiBenh AND
                    bn.HoTen LIKE '%${req.query.hoten}%' AND
                    pk.NgayKham LIKE '%${req.query.ngay}%' AND
                    pk.TrieuChung LIKE '%${req.query.trieuchung}%' AND
                    lb.MaLoaiBenh LIKE '%${req.query.loaibenh}%'`
            // console.log(query);
            db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/benhnhan');
                }
                if (results.length == 0) {
                    resolve("<tr><td colspan='6'>Không tìm thấy bệnh nhân</td></tr>")
                } else {
                    kq = '';
                    results.forEach((element, index) => {
                    let NgayKham = moment(element.NgayKham).format('L');
                    kq += `<tr>
                         <td> ${index+1} </td>
                         <td> ${element.HoTen} </td>
                         <td> ${NgayKham} </td>
                         <td> ${element.TenLoaiBenh} </td>
                         <td> ${element.TrieuChung} </td>
                         <td class='hidden-print'>
                                <a href="/phieukhambenh/them/${element.MaBN}"
                                   class="btn btn-icon waves-effect waves-light btn-success" title="Thêm phiếu khám bệnh cho bệnh nhân này"> Thêm PKB</a>
                         </tr>`
                    });
                    resolve(kq);
                }
            });

        })
    },
};
module.exports = BenhNhanController;