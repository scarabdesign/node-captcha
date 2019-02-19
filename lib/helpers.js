
var config = require("../config").config,
	fonts = require("../config").fonts,
	configItem = function getConfig(key, defaultValue){
		if(!config[key] && defaultValue == undefined){
			var error = new Error("Config option not available");
			error.type = 404;
			return error;
		}
		if(config[key] == undefined)
			return defaultValue;
		return config[key];
	};

exports.getConfig = function getConfig(key, defaultValue){
	return configItem(key, defaultValue);
};

exports.getFonts = function getFonts(){
	return fonts;
};