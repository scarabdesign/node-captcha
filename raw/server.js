var express = require('express'),
	mustache = require('mustache'),
	nc = require('./index');
		
var app = express.createServer();

app.tmpl = {
	compile: function (source, options) {
		if (typeof source == 'string') {
			return function(options) {
				return mustache.to_html(source, options.view);
			};
		} else {
			return source;
		}
	},
	render: function (template, options) {
		template = this.compile(template, options);
		return template(options);
	}
};


app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use('/public', express.static(__dirname + '/public'));
	app.set('view options', {layout: false});
	app.set('views', __dirname + '/');
	app.register('.html', app.tmpl);
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
    }));
});

//require('./karaoke/index')(app, express);

app.get('/', nc.nc, function index(req, res){
	
	var view = {
		"yo": "yoyo",
		"nc": res.nc.imageTag
	};
	res.render("index.html", {"view": view});
});


app.listen(8080);
console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
