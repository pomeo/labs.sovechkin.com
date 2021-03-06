/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , avatar = require('./routes/avatar')
  , ask = require('./routes/ask')
  , chat = require('./routes/chat')
  , os = require('./routes/os')
  , http = require('http')
  , path = require('path');

var app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server, { log: false });

io.configure(function() {
  io.set('close timeout', 60*60*24);
});

app.configure(function(){
  app.set('port', 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.enable('trust proxy');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/avatar', avatar.img);
app.get('/ask', ask.index);
app.get('/chat', chat.index);
app.get('/os', os.index);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

chat.start(io.sockets);