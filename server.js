//var http = require('http');
//var server = http.createServer(function(req,res){
//    res.writeHead(200,{"Content-Type":"text/html"});
//    res.write("<!DOCTYPE 'html'>");
//    res.write("<html>");
//    res.write("<head>");
//    res.write("<title>Hello World page</title>");
//    res.write("</head>");
//    res.write("<body>Hello World</body>");
//    res.write("</html>");
//    res.end();
//});
//server.listen(8080);
//console.log("Server listening");
var express = require('express');
var request = require('request');
var assert = require('assert');
var app = express();
module.exports = function(){
    var i=0;
    app.use(function(req,res,next){
        console.log("Called "+i++);
        next();
    });
    app.get('/locs',function(req,res){
    //res.send('Hey World!!');
    request.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDmFO-PucyezubybwZd-eqah7w0qGJTBQw",function(error,resp,body){
        assert.ifError(error);
        assert.equal(resp.statusCode,200);
        var locData = JSON.parse(body);
        var locs = locData.results;
        locs.forEach(function(loc){
            console.log("name: "+loc.name);
        });
    });
    });
    return app;
};