const mongoose = require('mongoose')
const baseModel = require('./base.js')
const Schema = mongoose.Schema

class carInfo extends baseModel {

  constructor (props) {

    super(props)

    this.model = mongoose.model('carInfo', new Schema({
      title: { type: String, default: '' },
      preImgs: Array,
      subTitle: { type: String, default: '' },
      price: { type: String, default: '' },
      Configs: Array,
      desction: { type: String, default: '' },
      createDate: { type: Number, default: +new Date()}
    }))
    
  }

}

const carInfoins = new carInfo()

modules = module.exports = carInfoins
