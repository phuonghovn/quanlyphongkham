var express = require('express');
var router = express.Router();
var path = require('path');
var BenhNhanController = require('../controllers/BenhNhanController')
var PhieuKhamBenhController = require('../controllers/PhieuKhamBenhController')
var LoaiBenhController = require('../controllers/LoaiBenhController')
var ThuocController = require('../controllers/ThuocController')
var DonViController = require('../controllers/DonViController')
var CachDungController = require('../controllers/CachDungController')

var db = require('../models/dbconnection');
var bodyParser = require('body-parser').urlencoded({
  extended: true
});
/* GET home page. */

//=========================BenhNhan=============================//

router.get('/', function (req, res, next) {
  res.redirect('/benhnhan');
});

//Danh Sach Benh Nhan
router.get('/benhnhan', async function (req, res, next) {
  res.render('benhnhan/danhsach', {
    BenhNhan: await BenhNhanController.getDanhSachBenhNhan()
  });
});

//Them Benh Nhan
router.get('/benhnhan/them', function (req, res, next) {
  res.render('benhnhan/them');
});

router.post('/benhnhan/them', bodyParser, async function (req, res, next) {
  await BenhNhanController.postThemBenhNhan(req, res);
});

//Sua Benh Nhan
router.get('/benhnhan/sua/:MaBN', async function (req, res, next) {
  var MaBN = req.params.MaBN;
  var BenhNhan = await BenhNhanController.getSuaBenhNhan(MaBN);
  res.render('benhnhan/sua', {
    BenhNhan
  });
});

router.post('/benhnhan/sua/:MaBN', bodyParser, async function (req, res, next) {
  await BenhNhanController.postSuaBenhNhan(req, res);
});

//Xoa Benh Nhan
router.get('/benhnhan/xoa/:MaBN', async function (req, res, next) {
  await BenhNhanController.getXoaBenhNhan(req, res);
  // res.send('Da Xoa');
});

//Tra Cuu Benh Nhan
router.get('/benhnhan/tracuu', async function (req, res, next) {
  res.render('benhnhan/tracuu', {
    LoaiBenh: await LoaiBenhController.getLoaiBenh()
  });
});

//=========================PhieuKhamBenh=============================//

//Danh Sach Phieu Kham Benh
router.get('/phieukhambenh', async function (req, res, next) {
  var PhieuKhamBenh = await PhieuKhamBenhController.getPhieuKhamBenh()
  // res.send(PhieuKhamBenh);
  res.render('phieukhambenh/danhsach', {
    PhieuKhamBenh: await PhieuKhamBenhController.getPhieuKhamBenh()
  });
});

//Them Thieu Kham Benh
router.get('/phieukhambenh/them', async function (req, res, next) {
  // res.send(await BenhNhanController.getDanhSachBenhNhan())
  let DonVi = await DonViController.getDonVi()
  let BenhNhan = await BenhNhanController.getDanhSachBenhNhan()
  let LoaiBenh = await LoaiBenhController.getLoaiBenh()
  let Thuoc = await ThuocController.getThuoc()
  let CachDung = await CachDungController.getCachDung()
  res.render('phieukhambenh/them', {
    BenhNhan,
    LoaiBenh,
    DonVi,
    Thuoc,
    CachDung
  });
});

router.post('/phieukhambenh/them', bodyParser, async function (req, res, next) {
  await PhieuKhamBenhController.postPhieuKhamBenh(req, res);
});

//=========================LoaiBenh=============================//

router.get('/loaibenh', async function (req, res, next) {
  res.render('loaibenh/danhsach', {
    LoaiBenh: await LoaiBenhController.getLoaiBenh()
  });
});

router.post('/loaibenh/them', bodyParser, async function (req, res, next) {
  await LoaiBenhController.postThemLoaiBenh(req, res);
});

router.get('/loaibenh/xoa/:MaLoaiBenh', async function (req, res, next) {
  await LoaiBenhController.getXoaLoaiBenh(req, res);
  // res.send('Da Xoa');
});

router.get('/loaibenh/sua/:MaLoaiBenh', async function (req, res, next) {
  var MaLoaiBenh = req.params.MaLoaiBenh;
  var LoaiBenh = await LoaiBenhController.getSuaLoaiBenh(MaLoaiBenh);
  res.render('loaibenh/sua', {
    LoaiBenh
  });
});

router.post('/loaibenh/sua/:MaLoaiBenh', bodyParser, async function (req, res, next) {
  await LoaiBenhController.postSuaLoaiBenh(req, res);
});


//=========================Thuoc=============================//

router.get('/thuoc', async function (req, res, next) {
  res.render('thuoc/danhsach', {
    Thuoc: await ThuocController.getThuoc()
  });
});

router.get('/thuoc/them', async function (req, res, next) {
  res.render('thuoc/them', {
    DonVi: await DonViController.getDonVi(),
    CachDung: await CachDungController.getCachDung()
  });
});

router.post('/thuoc/them', bodyParser, async function (req, res, next) {
  await ThuocController.postThemThuoc(req, res);
});

router.get('/thuoc/xoa/:MaThuoc', async function (req, res, next) {
  await ThuocController.getXoaThuoc(req, res);
  // res.send('Da Xoa');
});

router.get('/thuoc/sua/:MaThuoc', async function (req, res, next) {
  var MaThuoc = req.params.MaThuoc;
  var Thuoc = await ThuocController.getSuaThuoc(MaThuoc);
  res.render('thuoc/sua', {
    Thuoc,
    DonVi: await DonViController.getDonVi(),
    CachDung: await CachDungController.getCachDung()
  });
});

router.post('/thuoc/sua/:MaThuoc', bodyParser, async function (req, res, next) {
  await ThuocController.postSuaThuoc(req, res);
});

//=========================DonVi=============================//

router.get('/donvi', async function (req, res, next) {
  res.render('donvi/danhsach', {
    DonVi: await DonViController.getDonVi()
  });
});

router.post('/donvi/them', bodyParser, async function (req, res, next) {
  await DonViController.postThemDonVi(req, res);
});

router.get('/donvi/xoa/:MaDonVi', async function (req, res, next) {
  await DonViController.getXoaDonVi(req, res);
});

router.get('/donvi/sua/:MaDonVi', async function (req, res, next) {
  var MaDonVi = req.params.MaDonVi;
  var DonVi = await DonViController.getSuaDonVi(MaDonVi);
  res.render('donvi/sua', {
    DonVi
  });
});

router.post('/donvi/sua/:MaDonVi', bodyParser, async function (req, res, next) {
  await DonViController.postSuaDonVi(req, res);
});

//=========================CachDung=============================//

router.get('/cachdung', async function (req, res, next) {
  res.render('cachdung/danhsach', {
    CachDung: await CachDungController.getCachDung()
  });
});

router.post('/cachdung/them', bodyParser, async function (req, res, next) {
  await CachDungController.postThemCachDung(req, res);
  s
});

router.get('/cachdung/xoa/:MaCachDung', async function (req, res, next) {
  await CachDungController.getXoaCachDung(req, res);

});

router.get('/cachdung/sua/:MaCachDung', async function (req, res, next) {
  var MaCachDung = req.params.MaCachDung;
  var CachDung = await CachDungController.getSuaCachDung(MaCachDung);
  res.render('cachdung/sua', {
    CachDung
  });
});

router.post('/cachdung/sua/:MaCachDung', bodyParser, async function (req, res, next) {
  await CachDungController.postSuaCachDung(req, res);
});

module.exports = router;