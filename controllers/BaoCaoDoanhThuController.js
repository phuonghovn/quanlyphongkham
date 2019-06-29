var db = require('../models/dbconnection');
var mysql = require('mysql');
var moment = require('moment');

var BaoCaoDoanhThuController = {
    getBaoCaoDoanhThu: function (req, res) {
        return new Promise((resolve, reject) => {
            console.log(req.query);
            var query = `SELECT pk.NgayKham, COUNT(pk.MaPKB) AS SoBenhNhan, SUM(hd.TienKham) + SUM(hd.TienThuoc) AS DoanhThu
            FROM phieukham pk, hoadon hd 
            WHERE pk.MaPKB = hd.MaPKB AND pk.NgayKham LIKE '%${req.query.key}%'
            GROUP BY pk.NgayKham`;
            console.log(query);
            var BaoCao = db.query(query, function (error, results) {
                //if error, print blank results
                if (error) {
                    res.redirect('/');
                }
                if (results.length == 0) {
                    resolve("<tr><td colspan='6'>Không có dữ liệu</td></tr>")
                } else {
                    kq = '';
                    var TongDoanhThu = 0;
                    results.forEach(element => TongDoanhThu += element.DoanhThu);
                    console.log(TongDoanhThu);
                    results.forEach((element, index) => {
                    let NgayKham = moment(element.NgayKham).format('MM/DD/YYYY');
                    kq += 
                    `<tr>
                     <td>${index + 1}</td>;
                     <td>${NgayKham}</td>;
                     <td>${element.SoBenhNhan}</td>;
                     <td>${element.DoanhThu}VND</td>;
                     <td>${(Number(element.DoanhThu)/TongDoanhThu*100).toFixed(2)}%</td>;
                     </tr>;`
                    });
                    resolve(kq);
                }
            });
        })
    }
};

module.exports = BaoCaoDoanhThuController;