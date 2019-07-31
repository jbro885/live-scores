// Modules
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3001;

// Server settings
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(require('./routes'));

// Initiate server
app.listen(port, function()
{
  console.log('Server running at https://localhost:' + port);
});