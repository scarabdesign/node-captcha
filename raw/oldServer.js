var http = require('http');
var capt = require('../index');

http.createServer(function(req, res) {
	if(req.url == "/"){
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		capt.tagtest(function(error, result){
			if(error)
				return console.log(error);
			res.end(result);
		});
	}
}).listen(8080);
console.log('Server running at http://localhost:8080/')
