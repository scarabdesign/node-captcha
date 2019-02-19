
var helpers = require("./helpers"),
	generator = require("./generator"),
	captchaType = helpers.getConfig("captchaType", "string"),
	allCharacters = helpers.getConfig("allCharacters", "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"),
	generateScript = function generateScript(image, hash, callback){
		try{
			var script = [];
			script.push('<div id="node-cap_div">');
				script.push('<script type="text/javascript" src="scripts"></script>');
				if(helpers.getConfig("useStyles", true)){
					script.push('<link rel="stylesheet" type="text/css" href="styles" />');
					script.push('<style type="text/css">');
					if(helpers.getConfig("displayRefreshImage", true)){
						script.push('#node-cap_inputrefresh { background-image: url("/refreshimage/'+helpers.getConfig("refreshImageColor", "#2C2")+'"); }');
					}
					if(captchaType == "math"){
						script.push('#node-cap_inputtext {width: 90px; margin-left: 305px !important;}');
					}
					script.push('<!--[if IE]>\n');
					script.push('#node-cap_inputtext {height: 26px !important;}\n');
					script.push('<![endif]-->\n');
					script.push('</style>');
				}
				script.push('<script type="text/javascript">');
					script.push('var refreshOnFail = ' + (helpers.getConfig("refreshOnFail", true)) + ';');
					script.push('var afterSubmitCallback = ' + (helpers.getConfig("afterSubmitCallback", "null")) + ';');
					script.push('var afterRefreshCallback = ' + (helpers.getConfig("afterRefreshCallback", "null")) + ';');
					script.push('var captchaType = "' + captchaType + '";');
					script.push('var allCharacters = "' + allCharacters + '";');
				script.push('</script>');
				script.push('<input type="hidden" value="true" name="node-cap_submit" />');
				script.push('<input type="hidden" id="node-cap_hash" value="'+hash+'" name="node-cap_hash" />');
				script.push('<img id="node-cap_image" src="data:image/jpeg;base64,' + image.toString('base64') + '" />');
				script.push('<div id="node-cap_inputdiv">');
				var maxlengthString = null, 
					checkInputString = null;
				if(captchaType == "math"){
					checkInputString = ' onkeypress="return nodeCaptcha.checkInput(event)" ';
					maxlength = 4;
				}else{
					maxlength = helpers.getConfig("numberOfCharacters", 8);
				}
				if(maxlength > -1)
					maxlengthString = ' maxlength="'+maxlength+'" ';
				script.push('<input type="text" id="node-cap_inputtext" '+(maxlengthString)+' name="node-cap_challenge" autocomplete="off" '+checkInputString+' />');
				script.push('<input type="button" id="node-cap_inputrefresh" onclick="nodeCaptcha.refresh(afterRefreshCallback)" />');
				script.push('</div>');
			script.push('</div>');
		}catch(e){
			return callback(e);
		}
		callback(null, script);
	},
	getNewCaptcha = function getNewCaptcha(callback){
		generator.getCapStr(function(error, capString, hash){
			if(error)
				return callback(error);
			generator.generateImage(capString, function(error, image){
				if(error)
					return callback(error);
				callback(null, image, hash);
			});
		});
	},
	getResourceImage = function getResourceImage(name, color, callback){
		generator.getResourceImage(name, color, callback);
	};
	
exports.createNCObj = function createNCObj(callback){
	getNewCaptcha(function(error, image, hash){
		if(error)
			return callback(error);
		generateScript(image, hash, function(error, scriptObj){
			if(error)
				return callback(error);
			callback(null, {"scriptObj": scriptObj.join("")});
		});
	});
};

exports.refreshCaptcha = function refreshCaptcha(callback){
	getNewCaptcha(callback);
};

exports.validateCaptcha = function validateCaptcha(challenge, hash, callback){
	compareHash(challenge, hash, callback);
};

exports.images = function images(name, color, callback){
	getResourceImage(name, color, callback);
};