

const userInfo = require('./userInfo');
 

exports = module.exports = function(app){
	app.use('/icar/api/userinfo', userInfo); 
};