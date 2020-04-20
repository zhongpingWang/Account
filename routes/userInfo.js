const express = require('express')
const router = express.Router()

const userInfo = require('../viewModel/userInfo.js')

router.get('/', function (req, res, next) {

  // var params = req.query

  // userInfo.findOne({account:params.account}).then((err,resData)=>{ 
  //     return userInfo.find(); 

  // }).then((resData,err)=>{
  //     console.log(+new Date())
  //     userInfo.resJSON(res,resData); 
  // })

  var params = {}

  for (var key in req.query) {
    if (key = 't') {
      continue
    }
    params[key] = req.query[key]
  }

  userInfo.find(params, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
    }

    userInfo.resJSON(res, data)
  })
})

// 获取用户信息
router.get('/info', function (req, res) {


  let User = req.session.userInfo || false

  if (!User) {
    userInfo.resError(res, '登录失效')
    return
  } 

  userInfo.findOne({_id: User._id}).then(function (doc) {
    if (doc == null) {
      userInfo.resError(res, '登录失效')
    }else {
      req.session.userInfo = doc
      userInfo.resJSON(res, User)
    }
  });


})

 

// 注册用户
router.post('/register', function (req, res, next) {
  var params = req.body

  userInfo.findOne({account: params.account}).then((resData) => {
    // 没有注册过
    if (resData == null) {
      return userInfo.save({
        userName: params.userName,
        passWord: params.passWord,
        account: params.account
      })
    }else {
      userInfo.resError(res, '账号已存在')
    }
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

router.delete('/del', function (req, res, next) {
  var _id = req.body._id

  if (!_id) {
    userInfo.resError(res, '缺少参数_id')
    return
  }

  userInfo.remove({
    _id: _id
  }, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
    }

    userInfo.resJSON(res, data)
  })
})

router.put('/update', function (req, res, next) {
  var data = {}

  if (req.body.userName) {
    data.userName = req.body.userName
  }
  if (req.body.passWord) {
    data.passWord = req.body.passWord
  }

  if (req.body.age) {
    data.age = req.body.age
  }

  if (req.body.address) {
    data.address = req.body.address
  }

  userInfo.update({
    _id: req.body._id
  }, data, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
    }

    userInfo.resJSON(res, data)
  })
})

router.post('/login', function (req, res, next) {
  
  var params = {
    _id: req.body._id
  }

  userInfo.find(params, function (err, resData) {
    var data = resData

    if (err) {
      console.log('失败')
      console.log(err)
      data = err
      userInfo.resJSON(res, data)
    }else {
      if (data.length > 0) {
        req.session.userInfo = data[0]
        userInfo.resJSON(res, data)
      }else {
        userInfo.resJSON(res, '登录失败')
      }
    }
  })
}) 
 

// 退出
router.get('/me', function (req, res) {
  var data = '未登录'

  if (req.session.userInfo) {
    data = req.session.userInfo
  }

  userInfo.resJSON(res, data)
})

exports = module.exports = router
