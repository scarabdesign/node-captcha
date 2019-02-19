
var gm = require("gm"),
	crypto = require("crypto"),
	helpers = require("./helpers"),
	fonts = fonts = helpers.getFonts(),
	_captchaType = helpers.getConfig("captchaType", "string"),
	_width = function (){
		var wid = helpers.getConfig("width", 230);
		if(_captchaType == "string" && wid < 230)
			wid = 230;
		if(_captchaType == "math" && wid < 430)
			wid = 430;
		return wid;
	}(),
	_height = helpers.getConfig("height", 50),
	_fontSize = helpers.getConfig("fontSize", 30),
	_fontColor = helpers.getConfig("fontColor", "#000")
	_rotateCharacters = helpers.getConfig("rotateCharacters", true),
	_numberOfCharacters = helpers.getConfig("numberOfCharacters", 8),
	_bgColor = helpers.getConfig("bgColor", "#FFF"),
	_bgTransparent = helpers.getConfig("bgTransparent", false),
	_grid = helpers.getConfig("displayGrid", true),
	_gridColor = helpers.getConfig("gridColor", "#EEE"),
	_obscure = helpers.getConfig("obscure", true),
	_numbers = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight",
		"Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
		"Seventeen","Eighteen","Nineteen","Twenty"],
	_operators = ["Minus", "Plus"],
	_allCharacters = helpers.getConfig("allCharacters", "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"),
	_caseSensitive = helpers.getConfig("caseSensitive", false),
	_hashsalt = helpers.getConfig("hashsalt", "noFxGivin"),
	template = function template(){
		var template = gm(_width, _height, _bgColor);
		if(_bgTransparent)
			template.setDraw("matte", 1, 1, "floodfill");
		if(_grid){
			var vlines = Math.floor(_width / 10) / 2,
				hlines = Math.floor(_height / 10) / 2,
				drawMatting = "";
			for(var i = 0; i < vlines; ++i)
				drawMatting += " rectangle " + ((i * 20) + 2) + ",0 " + ((i * 20) + 3) + "," + _height + " ";
			for(var i = 0; i < hlines; ++i)
				drawMatting += " rectangle " + " 0," + ((i * 20) + 2) + " " + _width + "," + ((i * 20) + 3);
			return template.fill(_gridColor).draw(drawMatting);
		}else{
			return template;
		}
	},
	prepImage = function prepImage(callback){
		var image = template();
		try{
			if(_obscure){
				var col = "000";
				for(var i = 0; i < col.length; ++i){
					var y = Math.floor(Math.random(i)*_height),
						rot = Math.floor(Math.random()*10) * (y > _height / 2 ? -1 : 1),
						fil = "#"+col.substring(0,i)+"F"+col.substring(i,col.length -1),
						drawOptions = [];
					drawOptions.push("rotate", rot, "rectangle", "0," + y + " " + _width + ", " + (y+1));
					image
						.fill(fil)
						.draw(drawOptions.join(" "));
				}
			}
			image
				.fill(_fontColor)
				.fontSize(_fontSize);
		}catch(e){
			return callback(e);
		}
		callback(null, image);			
	},
	placeChars = function placeChars(cs, image, callback){
		try{
			var index = 0;
			cs.split("").map(function(cha){
				var drawString = ["gravity", "center"];
				if(_rotateCharacters){
					var rot = Math.round(Math.sin(Math.random()*(index*5+1))*20);
					if(rot == 0) 
						rot = 1;			
					drawString.push("rotate", rot);
				}
				drawString.push("text", "0","0", "'"+cha+"'");
				var font = fonts[Math.floor(Math.random()*fonts.length)],
					spacing = Math.round(_width/_numberOfCharacters);
					regionX = index*(spacing);
				image
					.font(font)
					.region(spacing, _height, regionX, 0)
					.draw(drawString.join(" "));				
				++index;
			});
		}catch(e){
			return callback(e);
		}
		callback(null, image);
	},
	finalizeImage = function finalizeImage(image, callback){
		try{
			image
				.quality(0)
				.bitdepth(4);
		}catch(e){
			return callback(e);
		}
		callback(null, image);	
	},
	getCapString = function getCapString(callback){
		try{
			var hashable = "",
				capString = "",
				getString = function getString(){
					while(capString.length < _numberOfCharacters){
						var randNum = Math.floor(Math.random()*(_allCharacters.length));
						capString += _allCharacters.charAt(randNum);
					}
					hashable = capString;
				},
				getMath = function getMath(){
					var number_1 = Math.floor(Math.random()*(_numbers.length)),
						number_2 = Math.floor(Math.random()*(_numbers.length)),
						op = Math.floor(Math.random()*(_operators.length)),
						rop = op == 0 ? -1 : 1;
					hashable = number_1 + (rop)*number_2 + "";
					capString = _numbers[number_1] + " " + _operators[op] + " " + _numbers[number_2];
					_numberOfCharacters = capString.length;
				};
			switch(_captchaType){
				case "string":
					getString();
					break;
				case "math":
					getMath();
					break;
			}
			generateSaltedHash(hashable, function(error, hash){
				if(error)
					return callback(error);
				callback(null, capString, hash);
			});
		}catch(error){
			return callback(error);
		}
	},
	generateSaltedHash = function generateSaltedHash(capString, callback){
		var tlashsah = _hashsalt.split("").reverse().join(""),
			returnHash,
			md5sum;
		if(!_caseSensitive){
			capString = capString.toLowerCase();
		}
		try{
			md5sum = crypto.createHash("md5").update(_hashsalt + capString + tlashsah);
			returnHash = md5sum.digest("hex");
		}catch(error){
			return callback(error);
		}
		callback(null, returnHash);	
	},
	compareHash = function compareHash(challenge, hash, callback){
		generateSaltedHash(challenge, function(error, challengeHash){
			if(error)
				return callback(error);
			if(challengeHash == hash)
				return callback(null, true);
			callback(null, false);
		});
	},
	writeImage = function writeImage(image, callback){
		image.write(__dirname + "/test.png", callback);
	},
	errorOut = function errorOut(error, callback){
		return callback(error);
	},
	testFonts = function testFonts(callback){
		var returnTestImages = [];
		for(var i = 0, l = fonts.length; i < l; ++i){
			var image = template();
			
			spacing = Math.round(_width/_numberOfCharacters);
			regionX = index*(spacing);
		}
	},
	getResourceImg = function getResourceImg(name, color, callback){
		if(!color)
			color = "#2C2";
		var image = gm(28, 28, "#FFF")
			.setDraw("matte", 1, 1, "floodfill")
			.fill(color);
		if(name == "refreshimage"){
			image
				.drawArc(0, 24, 24, 0, 135, 315)
				.drawArc(0, 24, 24, 0, 45, 225)
				.fill("#FFF")
				.drawCircle(12, 12, 18, 18)
				.setDraw("matte", 12, 12, "floodfill")
				.fill(color)
				.drawPolygon([12, 12], [24, 0], [24, 12]);
		}
		image.stream("png", function (error, dataStream) {
			if(error)
				return errorOut(error, callback);
			var streamBuffer = []	
			dataStream.on('data', function(data) {
				streamBuffer.push(data);
			});
			dataStream.on('end', function() {
				var image = Buffer.concat(streamBuffer);
				callback(null, image);
			});
		});
	};
	
	
exports.generateImage = function generateImage(capString, callback){
	prepImage(function(error, image){
		if(error)
			return errorOut(error, callback);
		placeChars(capString, image, function(error, image){
			if(error)
				return errorOut(error, callback);
			finalizeImage(image, function(error, image){
				if(error)
					return errorOut(error, callback);
				image.stream("png", function (error, dataStream) {
					if(error)
						return errorOut(error, callback);
					var streamBuffer = []	
					dataStream.on('data', function(data) {
						streamBuffer.push(data);
					});
					dataStream.on('end', function() {
						var image = Buffer.concat(streamBuffer);
						callback(null, image);
					});
				});
			});
		});
	});
};

exports.getResourceImage = function getResourceImage(name, color, callback){
	getResourceImg(name, color, callback);
};

exports.getCapStr = function getCapStr(callback){
	getCapString(callback);
};
