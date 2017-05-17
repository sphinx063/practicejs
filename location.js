var location = require('./server');
var practice = require('./practice');
location().listen(8080,function(){
    practice();
    console.log('Server Listening');
    
});
//console.log('Server listening on 8080');