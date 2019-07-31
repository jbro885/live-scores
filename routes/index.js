// Modules
var express = require('express');
var axios = require('axios');

// Global variables
var baseUrl = 'https://allsportsapi.com';
var apiKey = 'edbd62c6bd0e88c46c263c363866a3da865209d385df597ee675b93f86587b65';

// Define router for handling routes
var router = express.Router();

// Routes
router.get('/', function(req, res)
{
  res.render('template',
  {
    'heading': 'home'
  });
});
router.get('/:sport', function(req, res)
{
  var sport = req.params.sport;

  axios.get(baseUrl + '/api/' + sport + '/?met=Countries&APIkey=' + apiKey)
  .catch(err => console.log('ok'))
  .then(response =>
  {
    // console.log(response);
    res.render('template', 
    {
      'heading': sport,
      'response': response
    })
  });
});

module.exports = router;