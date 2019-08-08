// Modules
var express = require('express');

// Define router for handling routes
var router = express.Router();

router.use(require('./routes-football.js'));
router.use(require('./routes-cricket.js'));

// Routes
router.get('/', function(req, res)
{
  res.render('home',
  {
    
  });
});

// methods
function sortJson(json)
{
  var sortedArray = [];

  for(var i in json)
  {
    sortedArray.push(json[i], i);
  }

  sortedArray.sort();

  return sortedArray;
}

module.exports = router;