
var nodeCaptcha = {
	"refresh": function refresh(callback){
		try{
			var challenge = document.getElementById("node-cap_inputtext"),
				resultObj = {
					"result": "unfinished",
					"td": new Date().getTime()
				};
			challenge.value = "";
			challenge.focus();
			if (axOb = new this.ajaxCall()){
				axOb.open('GET', "/node-captcha/nodecaprefresh", true)
					.send(null)
					.done(function(resString) {
						var res = JSON.parse(resString);
						document.getElementById("node-cap_hash").value = res.hash;
			        	document.getElementById("node-cap_image").src = "data:image/jpeg;base64," + res.image;
			        	callback && callback(res);
					});
			}else{
				resultObj.result = "failed";
				resultObj.error = "Problem with AJAX request";
				resultObj.td = new Date().getTime();
				callback && callback(resultObj);
			}
		}catch(error){
			resultObj.result = "failed";
			resultObj.error = error.message;
			resultObj.td = new Date().getTime();
			callback && callback(resultObj);
		}
	},
	"checkInput": function checkInput(evt){
		if(captchaType == "math"){
			evt = (evt) ? evt : event;
	        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
	            ((evt.which) ? evt.which : 0));
	        if (charCode >= 48 && charCode <= 57 || 
	        		charCode == 45 || 
	        		charCode == 46 || 
	        		charCode == 8 || 
	        		charCode == 13 || 
	        		charCode >= 35 && charCode <= 40) {
	            return true;
	        }
	        return false;
		}
	},
	"submit": function submit(callback){
		try{
			var challenge = document.getElementById("node-cap_inputtext"),
				hash = document.getElementById("node-cap_hash"),
				resultObj = {
					"result": "unfinished",
					"td": new Date().getTime()
				};
			if(!challenge || challenge.value.length == 0){
				challenge && challenge.focus();
				return false;
			}
			if (axOb = new this.ajaxCall()){
				axOb.open('POST', "/node-captcha/nodecapvalid", true)
					.head("Content-type", "application/x-www-form-urlencoded")
					.send("node-cap_challenge="+challenge.value+"&node-cap_hash="+hash.value)
					.done(function(resString){
						var res = JSON.parse(resString);
						if(res.result == "failed" && refreshOnFail == true)
							nodeCaptcha.refresh(afterRefreshCallback);
						callback && callback(res);
					});
			}else{
				resultObj.result = "failed";
				resultObj.error = "Problem with AJAX request";
				resultObj.td = new Date().getTime();
				callback && callback(resultObj);
			}
		}catch(error){
			resultObj.result = "failed";
			resultObj.error = error.message;
			resultObj.td = new Date().getTime();
			callback && callback(resultObj);
		}			
	},
	"ajaxCall": function ajaxCall(){
		try{
			var aObj = {
				"ajax": function(){
					var ajax = new XMLHttpRequest() || null;
					if(!ajax)
						ajax = new ActiveXObject("MSXML2.XMLHTTP.3.0") || null;
					if(!ajax)
						ajax = new ActiveXObject('Msxml2.XMLHTTP') || null;
					if(!ajax)
						ajax = new ActiveXObject("Microsoft.XMLHTTP") || null;
					return ajax;
				}(),
				"open": function open(type, url, async){
					var ts = new Date().getTime();
					aObj.ajax.open(type, url+"?"+ts, async);
					return aObj;
				},
				"head": function head(key, value){
					aObj.ajax.setRequestHeader(key, value);
					return aObj;
				},
				"send": function send(data){
					aObj.ajax.send(data);
					return aObj;
				},
				"resp": {
					"getHeader": function getHeader(key){
						for(var i = 0, l = aObj.resp.headers.length; i < l; ++i){
							if(aObj.resp.headers[i].search(key) > -1){
								return aObj.resp.headers[i].split(": ")[1].replace(/\n|\r/, "");
							}
						}
						return false;
					}
				},
				"done": function done(callback){
					aObj.ajax.onreadystatechange = function(){
						if(aObj.ajax.readyState == 4){
							aObj.resp.text = aObj.ajax.responseText;
							aObj.resp.headers = aObj.ajax.getAllResponseHeaders().split("\n");
							callback && callback(aObj.resp.text);
						}
					};
				}
			};
			return aObj;
		}catch(e){
			return false;
		}
	}
};