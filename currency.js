var express = require('express');
var app = express();
var superagent = require('superagent');
var url = 'https://openexchangerates.org/api/latest.json?app_id=3ac9aca0aa5245aaab54e521e2df8179';
var assert = require('assert');
var server = app.listen(3000,function(){
    superagent.get(url,function(err,res){
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function(){
            result = JSON.parse(res.text);
        });
        console.log(result.rates);
    });
});