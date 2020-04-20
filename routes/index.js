 
const userInfo = require('./userInfo');
const login = require('./login'); 
 

exports = module.exports = function(app){

	app.use('/account/api/userinfo', userInfo); 
	 
	app.use('/account/api/', login); 

	 
};