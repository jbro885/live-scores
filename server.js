// Modules
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3001;

// Server settings
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/modules', express.static(path.join(__dirname, './node_modules')));
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = io;

// Routes
app.use(require('./routes'));

io.on('connection', function(socket)
{
  console.log('a user connected');
  socket.on('disconnect', function()
  {
    console.log('user disconnected');
  });
});

// Initiate server
http.listen(port, function()
{
  console.log('Server running at https://localhost:' + port);
});