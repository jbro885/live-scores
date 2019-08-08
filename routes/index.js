// Modules
var express = require('express');
var axios = require('axios');
var io = require('socket.io');

// Global variables
var baseUrl = 'https://allsportsapi.com';
var apiKey = 'edbd62c6bd0e88c46c263c363866a3da865209d385df597ee675b93f86587b65';

// Define router for handling routes
var router = express.Router();

// Routes
router.get('/', function(req, res)
{
  res.render('home',
  {
    
  });
});
router.get('/:sport', function(req, res)
{
  var sport = req.params.sport;

  axios.get(baseUrl + '/api/' + sport + '/?met=Livescore&APIkey=' + apiKey)
  .then(function(response)
  {
    res.render('sport', 
    {
      'sport': sport,
      'response': response.data
    })
  });
});

module.exports = router;