

var gm = require("gm");
var image = gm(300, 300, "#0F0");
image
	.fontSize(25)
	.draw(
		"text", "10 50 'Good Text'"
	)
	.stroke("#000", 2)
	.draw(
		"text", "10 100 'New Text'"
	)
	.stroke("#000", "0")
	.draw(
		"text", "10 150 'Bad Text'"
	)
	.write("test.png", function(error){
		if(error)
			return console.dir(arguments);
		console.log(arguments[3]);
	});


