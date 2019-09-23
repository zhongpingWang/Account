

const userInfo = require('./userInfo');
const carInfo = require('./carInfo');


const multer = require('multer')

var upload = multer({ dest: 'uploads/'}) // 文件储存路径
 

exports = module.exports = function(app){
	app.use('/icar/api/userinfo', userInfo); 
	app.use('/icar/api/carinfo', carInfo); 

	// app.post('/icar/api/carinfo/uploader2', upload.array('file', 12), function (req, res, next) {

	// 	let files = req.files

	// 	console.log(files);

	//   })
};