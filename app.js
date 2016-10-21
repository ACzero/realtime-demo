var app = require('http').createServer(handler);
var qs = require('querystring');
var io = require('socket.io')(app);
var fs = require('fs');
var all_cilent = [];

console.log('listening at 3001');
app.listen(3001);

function handler (req, res) {
  if(req.method == 'POST' && req.url == '/send'){
    body = '';
    req.on('data', function(chunk) {
      body += chunk;
    }).on('end', function(){
      data = qs.parse(body);
      io.to(data.clientid).emit('message', data.message);
      console.log('send to ' + data.clientid + ' message: ' + data.message);
      res.writeHead(200);
      res.end('ok');
    });
  }else{
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
  }
}

io.on('connection', function (socket) {
  socket.emit('connect_success', { hello: 'world' });
  socket.on('register', function (data) {
    console.log('client id: ' + data.id);
    socket.join(data.id);
    all_cilent.push(data.id);
    io.to(data.id).emit('message', 'hi client : ' + data.id);
    io.to(data.id).emit('message', 'exist clients : ' + all_cilent.join(','));
  });
});
