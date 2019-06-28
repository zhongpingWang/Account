

const userInfo = require('./userInfo');
 

exports = module.exports = function(app){
	app.use('/userinfo', userInfo); 
};