var express = require('express');
var request = require('request');
var querystring = require('querystring');
var CLIENT_ID = 'abdd36c057a64c4cbfe6da5762119d9d';
var CLIENT_SECRET = 'cf34b93054a44583a20980eced82d63b';
var TOKEN = '';
var REDIRECT_URI = 'http://localhost:3000/callback';
var state = 'abcd1234';
var app = express();
app.get('/login',function(req,res){
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?'+
                querystring.stringify(
                {
                    client_id:CLIENT_ID,
                    response_type: 'code',
                    redirect_uri: REDIRECT_URI,
                    state: state,
                    scope: scope
                }
    ));
});
app.get('/callback',function(req,res){
    console.log('inside callback');
    var code = req.query.code || null;
    var returnedState = req.query.state || null;
    console.log('code: '+code);
    console.log('returnedState : '+returnedState);
    if(returnedState === null || state !== returnedState){
        console.log('State Mismatch');
    }else{
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI
            },
            headers: {
                'Authorization': 'Basic '+ (new Buffer(CLIENT_ID+':'+CLIENT_SECRET).toString('base64'))
            },
            json: true
        };
        request.post(authOptions,function(err,res,body){
            if(!err && res.statusCode === 200){
                console.log('successful token retrieval');
                var access_token = body.access_token;
                var refresh_token = body.refresh_token;
                console.log('acsessToken: '+access_token);
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer '+access_token
                    },
                    json: true
                };
                request.get(options,function(err,res,body){
                    if(err){
                        console.log('error retrieving data');
                    }
                    console.log('The body: '+JSON.stringify(body));
                });
            }
        });
    }
});
console.log('listening on 30000');
app.listen(3000);