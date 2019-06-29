

const userInfo = require('./userInfo');
 

exports = module.exports = function(app){
	app.use('/api/userinfo', userInfo); 
};