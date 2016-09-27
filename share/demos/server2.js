var http = require('http');
var server = http.createServer();
server.on('request', function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('Hello World\n' + Math.random());
});
server.on('request', function(req, res){
    console.log(new Date().toLocaleString() + '\t' +
    	req.url + '\t' +
    	req.headers['user-agent']
    );
});
server.listen(1337);
console.log('服务器运行中...');
