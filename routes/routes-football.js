// Modules
var express = require('express');
var axios = require('axios');
var io = require('socket.io');
var moment = require('moment');

// Global variables
var baseUrl = 'https://allsportsapi.com';
var apiKey = 'edbd62c6bd0e88c46c263c363866a3da865209d385df597ee675b93f86587b65';

// Define router for handling routes
var router = express.Router();

// Routes
router.get('/football/live', function(req, res)
{
  axios.get(baseUrl + '/api/football/?met=Livescore&APIkey=' + apiKey)
  .then(function(response)
  {
    // console.log(response.data.result);
    res.render('live', 
    {
      'sport': 'football',
      'response': response.data
    });
  });
});
router.get('/football/leagues', function(req, res)
{
  axios.get(baseUrl + '/api/football/?met=Leagues&APIkey=' + apiKey)
  .then(function(response)
  {    
    var result = sortJson(response.data);
    res.render('all-leagues',
    {
      'sport': 'football',
      'response': result
    })
  });
});
router.get('/football/league/:league_key', function(req, res)
{
  var lKey = req.params.league_key;
  var lName;

  axios.get(baseUrl + '/api/football/?met=Leagues&APIkey=' + apiKey)
  .then(function(response)
  {    
    for(var i = 0; i < response.data.result.length; i++)
    {
      if(response.data.result[i].league_key == lKey)
      {
        lName = response.data.result[i].league_name;
      }
    }
    res.render('league', 
    {
      'sport': 'football',
      'response': response.data,
      'league': lName
    })
  });
});
router.get('/football/fixtures/:date', function(req, res)
{
  var date = req.params.date;

  axios.get(baseUrl + '/api/football/?met=Fixtures&APIkey=' + apiKey + '&from=' + date + '&to=' + date)
  .then(function(response)
  {
    console.log(response.data);
    res.render('fixtures', 
    {
      'sport': 'football',
      'date': date,
      'response': response.data
    })
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