var express = require('express');
var router = express.Router();
var path = require('path');
var BenhNhanController = require('../controllers/BenhNhanController')
var db = require('../models/dbconnection');
var bodyParser = require('body-parser').urlencoded({ extended: true });
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('layout/index', { title: 'Express'});
});

//Danh Sach Benh Nhan
router.get('/benhnhan', async function (req, res, next) {
  res.render('benhnhan/danhsach', { BenhNhan: await BenhNhanController.getDanhSachBenhNhan()});
});

//Them Benh Nhan
router.get('/benhnhan/them', function (req, res, next) {
  res.render('benhnhan/them');
});

router.post('/benhnhan/them', bodyParser,async function (req, res, next) {
  await BenhNhanController.postThemBenhNhan(req, res);
});

//Sua Benh Nhan
router.get('/benhnhan/sua/:MaBN',async function (req, res, next) {
  var MaBN = req.params.MaBN;
  var BenhNhan = await BenhNhanController.getSuaBenhNhan(MaBN);
  res.render('benhnhan/sua', { BenhNhan });
  // res.send(BenhNhan);
});

router.post('/benhnhan/sua/:MaBN', bodyParser,async function (req, res, next) {
  var log = await BenhNhanController.themBenhNhan(req, res);
  // const { hoten, gioitinh, namsinh, diachi } = req.body;
  // var benhnhan = { hoten, gioitinh, namsinh, diachi };
  res.send(log);
});
module.exports = router;