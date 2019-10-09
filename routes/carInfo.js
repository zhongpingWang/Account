const express = require('express')
const router = express.Router()
var fs = require('fs')
var images = require('images')

const multer = require('multer')

var upload = multer({ dest: 'uploads/'}) // 文件储存路径

const carInfo = require('../viewModel/carInfo.js')

const uuid = require('uuid')

router.get('/', function (req, res, next) {
  var params = {}

  for (var key in req.query) {
    if (key = 't') {
      continue
    }
    params[key] = req.query[key]
  }

  carInfo.find(params, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
    }

    carInfo.resJSON(res, data)
  })
})

// 新增
router.post('/', function (req, res) {
  if (!req.session.userInfo || req.session.userInfo == null) {
    res.redirect('/pages/login/login')
    return
  }

  var params = req.body

  carInfo.save({
    title: params.title,
    preImgs: params.preImgs,
    subTitle: params.subTitle,
    price: params.price,
    Configs: params.Configs,
    desction: params.desction
  }).then((reqData) => {

    if (reqData != null) {
      carInfo.resJSON(res, reqData)
    }else {
      carInfo.resError(res, '系统错误')
    }
  })
})

// 获取信息
router.get('/', function (req, res) {
  if (!req.session.userInfo || req.session.userInfo == null) {
    res.redirect('/pages/login/login')
    return
  }

  var params = {}

  for (var key in req.query) {
    if (key = 't') {
      continue
    }
    params[key] = req.query[key]
  }

  carInfo.find(params, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
    }

    carInfo.resJSON(res, data)
  })
})

router.delete('/', function (req, res, next) {
  var _id = req.body._id

  if (!_id) {
    carInfo.resError(res, '缺少参数_id')
    return
  }

  carInfo.remove({
    _id: _id
  }, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
    }

    carInfo.resJSON(res, data)
  })
})

router.put('/', function (req, res, next) {
  var data = {}

  for (var key in req.body) {
    data[key] = req.body[key]
  }

  delete data._id

  carInfo.update({
    _id: req.body._id
  }, data, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
    }

    carInfo.resJSON(res, data)
  })
})



router.post('/uploader', upload.array('carlogo', 10), function (req, res) {
  if (!req.session.userInfo || req.session.userInfo == null) {
    res.redirect('/pages/login/login')
    return
  }

  let files = req.files

  if (files.length === 0) {
    carInfo.resError(res, '上传文件不能为空！')
    return
  } else {
    let fileInfos = []

    for (var i in files) {
      let file = files[i]
      let fileInfo = {}

      // 重命名
      let newName = uuid.v1()
      let originalname = file.originalname
      let index = originalname.lastIndexOf('.')
      let suffx = originalname.substring(index)
      let thumPath = newName + '_thum' + suffx
      newName += suffx


      // 文件夹必须存在 否则会报错
      fs.renameSync('./uploads/' + file.filename, './uploads/' + newName); // 这里修改文件名。

      // 拷贝
      // fs.writeFileSync('./uploads/abc/' + newName, fs.readFileSync('./uploads/' + newName))

      images('./uploads/' + newName)
        .size(400)
        .save('./uploads/thum/' + newName, {
          quality: 30
        });

      // 获取文件基本信息
      fileInfo.mimetype = file.mimetype
      fileInfo.originalname = newName
      fileInfo.size = file.size
      fileInfo.path = newName  

      fileInfos.push(fileInfo)
    }

    carInfo.resJSON(res, fileInfos)
  }
})

exports = module.exports = router
