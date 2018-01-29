const http = require('http');
const server = http.createServer(function(){

});
const socket = require('socket.io')(server);
server.listen(5000);
module.exports=socket;
