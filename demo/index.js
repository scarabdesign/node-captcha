var node_captcha = require('../index.js');

module.exports = function(app, express, auth){

	app.get("/capdemo", node_captcha.ncemw, function(req, res){
		res.render(__dirname + "/index.html", {
			"nc": res.nc.scriptObj
		});
	});
	
	app.post('/capdemo', node_captcha.ncemw, function(req, res){
		res.render(__dirname + "/index.html", {
			"nc": res.nc.scriptObj,
			"cr": res.nc.challengeResponse.result
		});
	});
	
};