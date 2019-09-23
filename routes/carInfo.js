const express = require('express')
const router = express.Router()
var fs = require('fs');

const multer = require('multer')

var upload = multer({ dest: 'uploads/'}) // 文件储存路径

const carInfo = require('../viewModel/carInfo.js')

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

  return

  userInfo.save({
    userName: params.userName,
    passWord: params.passWord,
    account: params.account
  }).then((reqData) => {

    // 账号已存在
    if (reqData == undefined) {
      return
    }

    if (reqData != null) {
      userInfo.resJSON(res, reqData)
    }else {
      userInfo.resError(res, '系统错误')
    }
  }).catch((error) => {
    userInfo.resError(res, error)
  })
})

router.post('/uploader', upload.array('carlogo', 10), function (req, res) {
 
  let files = req.files  

  console.log(files);

  if (files.length === 0) {
    carInfo.resError(res, '上传文件不能为空！')
    return
  } else {

    let fileInfos = []

    for (var i in files) {

      let file = files[i]
      let fileInfo = {}

      fs.renameSync('./uploads/' + file.filename, './uploads/' + file.originalname); // 这里修改文件名。

      // 获取文件基本信息
      fileInfo.mimetype = file.mimetype
      fileInfo.originalname = file.originalname
      fileInfo.size = file.size
      fileInfo.path = file.path

      fileInfos.push(fileInfo)
    }

    carInfo.resJSON(res, fileInfos)

  }

})

exports = module.exports = router
