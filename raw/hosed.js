var http = require('http'),
	fs = require('fs');
	gm = require("gm");

var fonts = require("./fonts").list();
	dir = __dirname + "/img";
	capString = "ABCDEFGH",
	//capString = "ABCD",
	prepImage = function(callback){
		var image;
		try{
			image = gm(dir+"/template.png")
				.fontSize(35);
			//var col = "000";
			//for(var i = 0; i < col.length; ++i)
			//	image
			//		.stroke("#"+col.substring(0,i)+"F"+col.substring(i,col.length -1), 2)
			//		.draw("line 0,"	+ 
			//			Math.floor(Math.random(i)*50) +
			//			" 230, " +
			//			Math.floor(Math.random(i)*50)
			//		);
			//image.stroke("#"+col, 1);
		}catch(e){
			return callback(e);
		}
		callback(null, image);			
	},
	placeChars = function(image, callback){
		try{
			
			image.draw("text 10 30 '"+capString+"'");				

			
			//var index = 0;
			//capString.split('').map(function(cha){
			//	var rot = Math.round(Math.sin(Math.random()*(index*5+1))*20);
			//	if(rot == 0) 
			//		rot = 1;
			//	var textX = rot > 0 ? 10 : 5,
			//		textY = rot > 0 ? 30 : 40,
			//		drawString = [];
			//	drawString.push(
			//		"rotate", rot,
			//		"text", textX+" "+textY+" '"+cha+"'"
			//	);
			//	var font = fonts[Math.floor(Math.random()*fonts.length-1)];
			//	image
			//		.font(font)
			//		.region(50, 50, index*25, 0)
			//		.draw(drawString.join(" "));				
			//	++index;
			//});
			
		}catch(e){
			return callback(e);
		}
		callback(null, image);
	},
	finalizeImage = function(image, callback){
		try{
			image
				.quality(0)
				.bitdepth(3);
		}catch(e){
			return callback(e);
		}
		callback(null, image);	
	},
	writeImage = function(image, callback){
		image.write(dir + "/test.png", callback);
	},
	result = function(error){
		if(error)
			return console.dir(arguments);
		console.log(arguments[3]);
	},
	errorOut = function(error){
		return console.log(error);
	};





http.createServer(function(req, res) {
	if(req.url == "/"){
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<html><body>');

		prepImage(function(error, image){
			if(error)
				return errorOut(error);
			placeChars(image, function(error, image){
				if(error)
					return errorOut(error);
				finalizeImage(image, function(error, image){
					if(error)
						return errorOut(error);
					
					
					//write image to test.png
					image.write(dir + "/test.png", function(error, result){
						if(error)
							return console.log(error);
			
						//stream image 
						image.stream("png", function (error, stdout, stderr) {
							if(error)
								return console.log(error);
							
							//pump to write stream
							var writeStream = fs.createWriteStream(dir + "/test2.png");
  							stdout.pipe(writeStream);
							
							//start begining of first image tag
							res.write('<img src="data:image/jpeg;base64,');
							
							//get data from stream
							stdout.on('data', function(data) {
								var dataString = new Buffer(data).toString('base64');
								res.write(dataString);
							});
							
							//on end, finish first tab
							stdout.on('end', function () {
								
								res.write('"/>');
								//read previously written test.png and steam it to image tag
								fs.readFile(dir + "/test.png", function(error, data) {
									if(error)
										return console.log(error);
									res.write('<img src="data:image/jpeg;base64,')
									res.write(new Buffer(data).toString('base64'));
									res.write('"/>');
									
									//read from file made by write stream
									fs.readFile(dir + "/test2.png", function(error, data) {
										if(error)
											return console.log(error);
										res.write('<img src="data:image/jpeg;base64,')
										res.write(new Buffer(data).toString('base64'));
										res.write('"/>');
										
										//finish html;
										res.end('</body></html>');
									});
									
									
								});
								
								
								
							});
						});
					});
						
						
				});
			});
		});
	}
}).listen(8080);
console.log('Server running at http://localhost:8080/')

	
	
//prepImage(function(error, image){
//	if(error)
//		return errorOut(error);
//	placeChars(image, function(error, image){
//		if(error)
//			return errorOut(error);
//		finalizeImage(image, function(error, image){
//			if(error)
//				return errorOut(error);
//			writeImage(image, result);
//		});
//	});
//});
//

