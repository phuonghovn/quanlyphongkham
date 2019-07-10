var db = require('../models/dbconnection');
var mysql = require('mysql');
var moment = require('moment');

var BaoCaoSuDungThuocController = {
    getBaoCaoSuDungThuoc: function (req, res) {
        return new Promise((resolve, reject) => {
            // console.log(req.query);
            var query = 
            `SELECT * 
            FROM    
                    (SELECT th.MaThuoc, th.TenThuoc, dv.TenDonVi
                    FROM thuoc th, donvi dv
                    WHERE th.MaDonVi = dv.MaDonVi) as tam1
            LEFT JOIN 
                    (SELECT ct.MaThuoc as MaThuocTam, COUNT(pk.MaPKB) AS SoLanSuDung, SUM(ct.SoLuong) SoLuongSuDung 
                    FROM phieukham pk, chitietphieukham ct 
                    WHERE pk.MaPKB = ct.MaPKB AND 
                            pk.NgayKham LIKE '%${req.query.key}%' 
                    GROUP BY ct.MaThuoc) AS tam2 
            ON tam1.MaThuoc = tam2.MaThuocTam
            ORDER BY tam1.MaThuoc`;
            // console.log(query);
            var BaoCao = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {

                    res.redirect('/');
                    // console.log(error.message);
                }
                // console.log(results);
                if (results.length == 0) {
                    resolve("<tr><td colspan='6'>Không có dữ liệu</td></tr>")
                } else {
                    kq = '';
                    var TongDoanhThu = 0;
                    results.forEach(element => TongDoanhThu += element.DoanhThu);
                    console.log(TongDoanhThu);
                    results.forEach((element, index) => {
                    let NgayKham = moment(element.NgayKham).format('MM/DD/YYYY');
                    const {MaThuoc, TenThuoc, TenDonVi, SoLanSuDung, SoLuongSuDung} = element
                    kq += 
                    `<tr>
                     <td>${index + 1}</td>;
                     <td>${TenThuoc}</td>;
                     <td>${TenDonVi}</td>;
                     <td>${SoLuongSuDung == null ? 0 : SoLuongSuDung}</td>;
                     <td>${SoLanSuDung == null ? 0 : SoLanSuDung}</td>;
                     </tr>;`
                    });
                    resolve(kq);
                }
                // console.log(results);
            });
        })
    }
};

module.exports = BaoCaoSuDungThuocController;