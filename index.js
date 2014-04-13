var http = require("http");
var connect = require('connect');
var bodyParser = require('body-parser');
function start(options){
	options=options||{};
	port=options.port||process.env['COLLECTOR_PORT']||3001;
	var app = connect();
	global._data=global._data||[];
	app.use(bodyParser());
	app.use(require('./list')());
	app.use(require('./receive')());
	app.use(function(req, res, next){
		if(req.url.substr(1)==='done' && req.method.toLowerCase()==='get'){
			console.log("Shutdown requested");
			res.statusCode=204;
			res.end();
			process.exit();
		}else{
			next();
		}
  	});
	app.use(function(req, res){
	    res.end();
  	});
	http.createServer(app).listen(port);
	console.log("Collector started on port %d", port);
}
module.exports=start;
