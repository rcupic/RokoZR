var http = require('http');
var server = http.createServer(function(){

});
var socket = require('socket.io')(server);
server.listen(5000);
module.exports=socket;