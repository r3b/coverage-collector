global._data=global._data||[];
module.exports = function serveCoverageSetup() {
  return function serveCoverageHandle(req, res, next) {
      if(req.url.substr(1)==='data' && req.method.toLowerCase()==='post'){
        console.log("received post data\n");
        console.log(req.body);
        global._data.push(req.body);
          res.statusCode=204;
          res.end();

      }else{
        next();
      }
  };
};
