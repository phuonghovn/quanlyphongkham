var db = require('../models/dbconnection');
var mysql = require('mysql');

//create class
var PhieuKhamBenhController = {
    getPhieuKhamBenh: function (req, res) {
        return new Promise((resolve, reject) => {
            var BenhNhan = db.query(`SELECT NgayKham, pk.MaBN, HoTen, TrieuChung, pk.MaLoaiBenh, TenLoaiBenh
            from phieukham pk, benhnhan bn, loaibenh lb
            where pk.MaBN = bn.MaBN AND pk.MaLoaiBenh = lb.MaLoaiBenh`, function (error, results) {
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
    postPhieuKhamBenh: function (req, res) {
        return new Promise(async (resolve, reject) => {

            function getMaPKB() {
                return new Promise((resolve, reject) => {
                    db.query(`SELECT MAX(MaPKB) FROM phieukham`, function (error, results) {
                        //if error, print blank results
                        if (error) {
                            res.redirect('/');
                        }
                        resolve(Object.values(results[0]).pop());
                    });
                })
            }

            function getThuoc(MaThuoc) {
                return new Promise((resolve, reject) => {
                    db.query(`SELECT DonGia, SoLuongConLai FROM thuoc WHERE MaThuoc = ${MaThuoc}`, function (error, results) {
                        //if error, print blank results
                        if (error) {
                            res.redirect('/');
                        }
                        // resolve(results);
                        resolve(Object.values(results[0]));
                    });
                })
            }


            function postPhieuKham() {
                return new Promise((resolve, reject) => {
                    var query = `INSERT INTO phieukham (NgayKham, MaBN, TrieuChung, MaLoaiBenh) VALUES (${mysql.escape(req.body.ngaykham)}, 
                    ${mysql.escape(req.body.mabn)}, 
                    ${mysql.escape(req.body.trieuchung)}, 
                    ${mysql.escape(req.body.loaibenh)})`

                    var BenhNhan = db.query(query, function (error, results) {
                        //if error, print blank results
                        if (error) {}
                        resolve(true)
                    });
                })
            }

            function getTienKham() {
                return new Promise((resolve, reject) => {
                    var query = `SELECT GiaTri FROM thamso WHERE ThamSo = 'TienKham'`

                    db.query(query, function (error, results) {
                        //if error, print blank results
                        if (error) {}
                        resolve(Object.values(results[0]).pop());                        
                    });
                })
            }

            function getTienThuoc(MaPKB) {
                return new Promise((resolve, reject) => {
                    var query = `SELECT ThanhTien FROM chitietphieukham WHERE MaPKB = ${MaPKB}`
                    db.query(query, function (error, results) {
                        //if error, print blank results
                        let TongTien = 0;
                        if (error) {}
                        results.forEach((element) => {
                            TongTien += Number(Object.values(element).pop());
                        });
                        resolve(TongTien);                        
                    });
                })
            }

            function postChiTietPhieuKham() {
                return new Promise(async(resolve, reject) => {
                    var query = 'INSERT INTO chitietphieukham (MaPKB, MaThuoc, DonGia, SoLuong, ThanhTien, created_at, updated_at) VALUES ';
                    var query2 = 'INSERT INTO thuoc (MaThuoc, SoLuongConLai, updated_at) VALUES ';

                    for (let key in req.body) {
                        if (key != 'mabn' && key != 'trieuchung' && key != 'ngaykham' && key != 'loaibenh' && req.body[key] != '0') {
                            var Thuoc = await getThuoc(key);
                            query += `(${MaPKB}, ${key}, ${Thuoc[0]}, ${req.body[key]}, ${Number(Thuoc[0]) * Number(req.body[key])}, NOW(), NOW()),`
                            query2 += `(${key}, ${Number(Thuoc[1]) - Number(req.body[key])}, NOW()),`
                        }
                    }
                    query = query.slice(0,query.length - 1);
                    query2 = query2.slice(0,query2.length - 1);
                    query2 += `ON DUPLICATE KEY UPDATE 
                    SoLuongConLai = VALUES(SoLuongConLai),
                    updated_at = VALUES(updated_at)`
                    db.query(query, function (error, results) {
                        //if error, print blank results
                        if (error) {
                        }
                        // resolve(true)
                    });
                    db.query(query2, function (error, results) {
                        //if error, print blank results
                        if (error) {
                        }
                        resolve(true)
                    });
                })
            }

            function postHoaDon(MaPKB, TienKham, TienThuoc) {
                return new Promise(async(resolve, reject) => {
                    var query = `INSERT INTO hoadon (MaPKB, TienKham, TienThuoc, created_at, updated_at) VALUES (${MaPKB}, ${TienKham}, ${TienThuoc}, NOW(), NOW())`;
                    db.query(query, function (error, results) {
                        //if error, print blank results
                        if (error) {

                        }
                        resolve(true)
                    });
                })
            }

            await postPhieuKham();
            var MaPKB = await getMaPKB();
            await postChiTietPhieuKham();
            var TienKham = await getTienKham();
            console.log(TienKham);
            var TienThuoc = await getTienThuoc(MaPKB);
            console.log(TienThuoc);
            await postHoaDon(MaPKB, TienKham, TienThuoc);
            res.redirect('/phieukhambenh');
        })
    }
};
module.exports = PhieuKhamBenhController;