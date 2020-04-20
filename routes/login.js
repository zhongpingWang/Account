const express = require('express');
const router = express.Router();

const UserInfo = require('../viewModel/userInfo.js')

// 登录
router.post('/login', function (req, res) {

    var params = req.body

    UserInfo.findOne({ account: params.account, passWord: params.passWord }).then(function (doc) {

        if (doc == null) {

            UserInfo.resError(res, '用户名或密码错误')
        } else {

            req.session.userInfo = doc
            UserInfo.resJSON(res, doc)
        }

    });

});

// 退出
router.get('/loginout', function (req, res) {

    // 删除session
    req.session.userInfo = null; 
    UserInfo.resJSON(res, { data: '退出成功' })
})

exports = module.exports = router