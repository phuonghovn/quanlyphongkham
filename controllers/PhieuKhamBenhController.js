var db = require('../models/dbconnection');
var mysql = require('mysql');


//create class
var PhieuKhamBenhController = {
    getDanhSachPhieuKhamBenh: function (req, res) {
        return new Promise((resolve, reject) => {
            var BenhNhan = db.query(`SELECT pk.MaPKB, NgayKham, pk.MaBN, HoTen, TrieuChung, pk.MaLoaiBenh, TenLoaiBenh
            from phieukham pk, benhnhan bn, loaibenh lb
            where pk.MaBN = bn.MaBN AND pk.MaLoaiBenh = lb.MaLoaiBenh
            ORDER BY pk.created_at DESC
            `, function (error, results) {
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
                    var query = `INSERT INTO phieukham (NgayKham, MaBN, TrieuChung, MaLoaiBenh, created_at, updated_at) 
                    VALUES (NOW(), 
                    ${mysql.escape(req.body.mabn)}, 
                    ${mysql.escape(req.body.trieuchung)}, 
                    ${mysql.escape(req.body.loaibenh)},
                    NOW(),
                    NOW())`
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
    },
    getPhieuKhamBenh: function (MaPKB) {
        return new Promise((resolve, reject) => {
            var BenhNhan = db.query(`SELECT NgayKham, pk.MaBN, HoTen, TrieuChung, pk.MaLoaiBenh, TenLoaiBenh
            from phieukham pk, benhnhan bn, loaibenh lb
            where pk.MaBN = bn.MaBN AND pk.MaLoaiBenh = lb.MaLoaiBenh AND MaPKB=${MaPKB}`, function (error, results) {
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
    getChiTietPKB: function (MaPKB){
        return new Promise((resolve, reject) => {
            var ChiTietPKB = db.query(`SELECT th.TenThuoc, dv.TenDonVi, ct.SoLuong, cd.CachDung, ct.DonGia, ct.ThanhTien
            from thuoc th, cachdung cd, donvi dv, chitietphieukham ct
            where ct.MaPKB=${MaPKB} AND ct.MaThuoc=th.MaThuoc AND th.MaDonVi=dv.MaDonVi AND th.MaCachDung=cd.MaCachDung`, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                // console.log(results);
                resolve(results);
            });
        })
    },
    getHoaDon: function (MaPKB) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from hoadon where MaPKB=${MaPKB}`;
            db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/phieukhambenh');
                }
                resolve(results);                
            });
        })
    },
    getDanhSachKhamBenhAjax: function (req, res) {
        return new Promise((resolve, reject) => {
            // console.log(req.query);
            var query = `SELECT pk.MaPKB, bn.HoTen, bn.GioiTinh, bn.NamSinh, bn.DiaChi
            FROM phieukham pk, benhnhan bn
            WHERE   pk.MaBN = bn.MaBN AND
                    pk.ngaykham = ${mysql.escape(req.query.key)}`
            // console.log(query);
            db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/phieukhambenh');
                }
                if (results.length == 0) {
                    resolve("<tr><td colspan='6'>Không tìm thấy bệnh nhân</td></tr>")
                } else {
                    kq = '';
                    results.forEach((element, index) => {
                    kq += 
                    `<tr>
                     <td>${index + 1}</td>
                     <td>${element.HoTen}</td>
                    ${(element.GioiTinh == 1) ? '<td>Nữ</td>' : (element.GioiTinh == 2) ? '<td>Nam</td>' : '<td>Khác</td>'}
                     <td>${element.NamSinh}</td>
                     <td>${element.NamSinh}</td>
                     <td><a href='/phieukhambenh/chitiet/${element.MaPKB}' target='_blank'
                                       class='btn btn-icon waves-effect waves-light btn-success' title='Chi tiết đơn thuốc'>
                                        Đơn thuốc</a> . </td>;
                     </tr>`
                    });
                    resolve(kq);
                }
                // console.log(results);
            });

        })
    },
};

module.exports = PhieuKhamBenhController;