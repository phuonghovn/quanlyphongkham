var db = require('../models/dbconnection');
var mysql = require('mysql');
var moment = require('moment');

//create class
var TrangChuController = {
    getSoBenhNhanTrongThang: function (month) {
        return new Promise((resolve, reject) => {
            var query = `SELECT COUNT(DISTINCT MaBN) AS Dem
            FROM phieukham 
            WHERE NgayKham LIKE '%${month}%'`
            var SoBenhNhan = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                resolve(results);
            });
        })
    },
    getPhieuKhamTrongThang: function (month) {
        return new Promise((resolve, reject) => {
            var query = `SELECT COUNT(MaPKB) AS Dem FROM phieukham WHERE NgayKham LIKE '%${month}%'`
            var SoPhieuKham = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                resolve(results);
            });
        })
    },
    getTongTienKhamTrongThang: function (month) {
        return new Promise((resolve, reject) => {
            var query = `SELECT SUM(TienKham) AS TongTienKham
                        FROM hoadon
                        WHERE created_at LIKE '%${month}%'`
            var TongTienKham = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                resolve(results);
            });
        })
    },
    getTongDoanhThuTrongThang: function (month) {
        return new Promise((resolve, reject) => {
            var query = `SELECT SUM(TienKham) + SUM(TienThuoc) AS DoanhThu
            FROM hoadon
            WHERE created_at LIKE '%${month}%'`
            var DoanhThu = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                resolve(results);
            });
        })
    },
    getTop3SoLanSDTTrongThang: function (month) {
        return new Promise((resolve, reject) => {
            var query = `SELECT *
    FROM    
            (SELECT th.MaThuoc, th.TenThuoc, dv.TenDonVi
            FROM thuoc th, donvi dv
            WHERE th.MaDonVi = dv.MaDonVi) as tam1
    LEFT JOIN 
            (SELECT ct.MaThuoc as MaThuocTam, COUNT(pk.MaPKB) AS SoLanSuDung, SUM(ct.SoLuong) SoLuongSuDung 
            FROM phieukham pk, chitietphieukham ct 
            WHERE pk.MaPKB = ct.MaPKB AND 
                    pk.NgayKham LIKE '%${month}%' 
            GROUP BY ct.MaThuoc) AS tam2 
    ON tam1.MaThuoc = tam2.MaThuocTam
    ORDER BY tam2.SoLanSuDung DESC LIMIT 3`
            var DoanhThu = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // console.log(results);
                resolve(results);
            });
        })
    },
    getTop3SoLuongSDTTrongThang: function (month) {
        return new Promise((resolve, reject) => {
            var query = `SELECT *
                            FROM    
                                    (SELECT th.MaThuoc, th.TenThuoc, dv.TenDonVi
                                    FROM thuoc th, donvi dv
                                    WHERE th.MaDonVi = dv.MaDonVi) as tam1
                            LEFT JOIN 
                                    (SELECT ct.MaThuoc as MaThuocTam, COUNT(pk.MaPKB) AS SoLanSuDung, SUM(ct.SoLuong) SoLuongSuDung 
                                    FROM phieukham pk, chitietphieukham ct 
                                    WHERE pk.MaPKB = ct.MaPKB AND 
                                            pk.NgayKham LIKE '%${month}%' 
                                    GROUP BY ct.MaThuoc) AS tam2 
                            ON tam1.MaThuoc = tam2.MaThuocTam
                            ORDER BY tam2.SoLuongSuDung DESC LIMIT 3`
            var DoanhThu = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // console.log(results);
                resolve(results);
            });
        })
    },
    getSoBenhNhanConLai: function (req, res) {
        return new Promise(async (resovle, reject) => {
            function getSoBenhNhanDaKham() {
                return new Promise((resolve, reject) => {
                    var now = moment().format('YYYY-MM-DD');
                    // console.log(now);
                    var query = `SELECT COUNT(MaPKB) AS Dem
                                    FROM phieukham pk
                                    WHERE pk.NgayKham=${mysql.escape(now)}`
                    var SoBenhNhanDaKham = db.query(query, function (error, results) {
                        //if error, print blank results
                        if (error) {
                            // res.redirect('/');
                        }
                        resolve(Object.values(results[0]).pop());
                    });
                })
            }

            function getSoBenhNhanToiDa() {
                return new Promise((resolve, reject) => {
                    var query2 = `SELECT GiaTri
                            FROM thamso
                            WHERE ThamSo = 'SoBenhNhanToiDa'`
                    // console.log(query2);
                    var SoBenhNhanToiDa = db.query(query2, function (error, results) {
                        //if error, print blank results
                        if (error) {
                            // res.redirect('/');
                        }
                        resolve(Object.values(results[0]).pop());
                    });
                })
            }
            var SoBenhNhanDaKham = await getSoBenhNhanDaKham();
            var SoBenhNhanToiDa = await getSoBenhNhanToiDa();
            resovle(`Số bệnh nhân có thể khám còn lại là:<strong style=" font-size: 1.25em">${SoBenhNhanToiDa-SoBenhNhanDaKham}</strong>`);
        })
    },
    getChart: function (month) {
        return new Promise((resolve, reject) => {
            var label = [];
            for (let i = moment().format('DD')-7;i<moment().format('DD'); i++){
                label.push(`${moment().format('MM')}-${i<10 ? '0'+i : i}`)
            }
            var data = [];
            label.forEach((e,i)=>{
                let query =`SELECT SUM(TienKham) + SUM(TienThuoc) AS DoanhThu
                FROM hoadon
                WHERE created_at LIKE '%${'2019-'+e}%'`
                db.query(query, function (error, results) {
                    //if error, print blank results
                    if (error) {
                        res.redirect('/');
                    }
                    console.log(results[0].DoanhThu == null ? 0 : results[0].DoanhThu);

                    data.push(results[0].DoanhThu == null ? 0 : results[0].DoanhThu);
                });
            });
            resolve({label, data});
        })
    },
};
module.exports = TrangChuController;