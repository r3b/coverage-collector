global._data=global._data||null;
module.exports = function serveCoverageSetup() {
  return function serveCoverageHandle(req, res, next) {
      if(req.url.substr(1)==='data' && req.method.toLowerCase()==='get'){
        if(Array.isArray(global._data)){
          res.setHeader("Content-Type", "application/javascript");
          res.statusCode=200;
          res.end(JSON.stringify(global._data));
        }else{
          res.statusCode=204;
          res.end();
        }
      }else{
        next();
      }
  };
};
