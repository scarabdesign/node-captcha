// node-captcha - Sean Hankins <scarabdeisgn@gmail.com>

var nodeCaptcha = require("./lib/display"),
	fs = require("fs"),
	validateCaptcha = function validateCaptcha(challenge, hash, callback){
		var resultObj = {
			"result": "unfinished",
			"td": new Date().getTime()
		};
		if(!challenge || !hash){
			resultObj.result = "failed";
			resultObj.error = "Missing information.";
			return callback(resultObj);
		}
		nodeCaptcha.validateCaptcha(challenge, hash, function(error, result){
			if(error){
				resultObj.result = "failed";
				resultObj.error = error.message;
			}else{
				resultObj.result = result ? "passed" : "failed";
			}
			resultObj.td = new Date().getTime();
			callback(resultObj);
		});
	};
	
exports.ncemw = function ncemw(req, res, next){
	res.nc = {};
	nodeCaptcha.createNCObj(function(error, captObj){
		if(error)
			return next(error);
		res.nc = captObj;
		res.nc.challengeResponse = {};
		var submitCaptcha = req.body["node-cap_submit"],
			challenge = req.body["node-cap_challenge"],
			hash = req.body["node-cap_hash"];
		
		if(submitCaptcha && submitCaptcha == "true"){
			validateCaptcha(challenge, hash, function(result){
				res.nc.challengeResponse = result;
				return next();
			});
		}else{
			next();
		}
	});
};

exports.ncvalid = function ncvalid(req, res, next){
	var challenge = req.body["node-cap_challenge"],
		hash = req.body["node-cap_hash"];
	res.nc = {
		"challengeResponse": {}
	};
	validateCaptcha(challenge, hash, function(result){
		res.nc.challengeResponse = result;
		next();
	});
}

exports.ncroutes = function ncroutes(app, express){
		
	app.get("/node-captcha/scripts.js", function(req, res){
		fs.readFile(__dirname + "/lib/scripts.js", function(error, data){
			if(error)
				return res.send(error, 500);
			res.send(data, { "Content-Type": "text/html" }, 200);
		});
	});
	
	app.get("/node-captcha/styles.css", function(req, res){
		fs.readFile(__dirname + "/lib/styles.css", function(error, data){
			if(error)
				return res.send(error, 500);
			res.send(data, { "Content-Type": "text/html" }, 200);
		});
	});
	
	app.get("/node-captcha/refreshimage/:color?", function(req, res){
		var color = req.query["color"];
		nodeCaptcha.images("refreshimage", color, function(error, data){
			if(error)
				return res.send(error, 500);
			res.send(data, { "Content-Type": "image/png" }, 200);
		});
	});
	
	app.get("/node-captcha/nodecaprefresh", function(req, res){
		var resultObj = {
			"result": "unfinished",
			"td": new Date().getTime()
		};
		nodeCaptcha.refreshCaptcha(function(error, image, hash){
			if(error){
				return res.send(
					JSON.stringify({
						"result": "failed",
						"error": error.message,
						"td": new Date().getTime()
					}
				), 500);
			}
			res.send(
				JSON.stringify({
					"result": "refreshed",
					"image": image.toString('base64'),
					"hash": hash,
					"td": new Date().getTime()
				}
			), {
				"Content-Type": "text/plain; charset=x-user-defined"
			}, 200);
		});
	});
	
	app.post("/node-captcha/nodecapvalid", function(req, res){
		var challenge = req.body["node-cap_challenge"],
			hash = req.body["node-cap_hash"];
		
		validateCaptcha(challenge, hash, function(result){
			res.send(JSON.stringify(result), { "Content-Type": "text/plain"}, 200);
		});
	});

};