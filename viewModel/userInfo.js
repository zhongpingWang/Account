
const mongoose = require('mongoose');

const baseModel = require("./base.js");


const Schema = mongoose.Schema;


class userInfo extends baseModel {

    constructor(props) {
        super(props)
        this.model = mongoose.model('userInfo', new Schema({
            userName: String,
            passWord: String,
            age: Number,
            address: String,
            posi:String,
        }));
    } 

}

const userInfoIns = new userInfo();

modules = module.exports = userInfoIns;