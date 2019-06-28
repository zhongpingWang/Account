
const express = require("express");
const router = express.Router();

const userInfo = require("../viewModel/userInfo.js"); 
 

router.get('/',function(req, res, next){

    var params = {};

    for(var key in req.query){
        if(key="t"){
            continue;
        }
        params[key] = req.query[key];
    } 

    userInfo.find(params,function(err,resData) {

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data); 
    
    });

 
})

router.post("/register",function(req, res, next){ 
    

    userInfo.save({
        userName: "zpp",
        passWord: "zpp",
        age: 16,
        address: "shanghai",
        posi:"你猜",
    },function(err,resData){

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data); 

    });

 


});

router.delete("/del",function(req, res, next){

    var _id = req.body._id; 
   
    if(!_id){
        userInfo.resError(res,'缺少参数_id');
        return;
    }

    userInfo.remove({
        _id: _id
    },function(err,resData){

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data);


    }); 

});

router.put("/update",function(req, res, next){ 
    
    var data = {}

    if(req.body.userName){
        data.userName = req.body.userName;
    }
    if(req.body.passWord){
        data.passWord = req.body.passWord;
    } 
    
    if(req.body.age){
        data.age = req.body.age;
    }
 
    if(req.body.address){
        data.address = req.body.address;
    }
  

    userInfo.update({
        _id: req.body._id
    },data,function(err,resData){

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data);


    }); 

});

router.post("/login",function(req,res,next){


    var params = {
        _id:req.body._id
    }; 

    userInfo.find(params,function(err,resData) {

        var data = resData; 

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
            userInfo.resJSON(res,data); 

        }else{

            if(data.length>0){
                req.session.userInfo = data[0];
                userInfo.resJSON(res,data); 
            }else{
                userInfo.resJSON(res,"登录失败"); 
            }
            
        } 
    
    }); 
 
});

// 退出
router.get('/loginout', function (req, res) {
    req.session.userInfo = null; // 删除session
    userInfo.resJSON(res,{data:"退出成功"});
});

// 退出
router.get('/me', function (req, res) {

    var data = "未登录";

    if(req.session.userInfo){
        data = req.session.userInfo;
    } 

    userInfo.resJSON(res,data);

});

exports = module.exports = router;