var cluster = require('cluster');
var http = require("http");
var connect = require('connect');
var bodyParser = require('body-parser');

function start(){
	if (cluster.isMaster) {
		cluster.fork();
		cluster.on('exit', function(worker, code, signal) {
			console.log('server has exited, Shutting down.');
		});
	} else {
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
		http.createServer(app).listen(3000);
	}
}
module.exports=start;
