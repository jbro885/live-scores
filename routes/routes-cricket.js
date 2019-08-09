// Modules
var express = require('express');
var axios = require('axios');
var moment = require('moment');

// Global variables
var baseUrl = 'https://allsportsapi.com';
var apiKey = 'edbd62c6bd0e88c46c263c363866a3da865209d385df597ee675b93f86587b65';
var today = moment().local().format('YYYY-MM-DD');
var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');

// Define router for handling routes
var router = express.Router();

// io.on('connection', function(socket)
// {
//   console.log('a user connected');
// });

// Routes
router.get('/cricket/live', function(req, res)
{
  axios.get(baseUrl + '/api/cricket/?met=Livescore&APIkey=' + apiKey)
  .then(function(response)
  {
    console.log(response.data.result);
    res.render('live', 
    {
      'sport': 'cricket',
      'response': response.data
    });
  });
});
router.get('/cricket/leagues', function(req, res)
{
  axios.get(baseUrl + '/api/cricket/?met=Leagues&APIkey=' + apiKey)
  .then(function(response)
  {    
    var result = sortJson(response.data);
    res.render('all-leagues',
    {
      'sport': 'cricket',
      'response': result
    })
  });
});
router.get('/cricket/league/:league_key', function(req, res)
{
  var lKey = req.params.league_key;
  var lName;

  axios.get(baseUrl + '/api/cricket/?met=Leagues&APIkey=' + apiKey)
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
      'sport': 'cricket',
      'response': response.data,
      'league': lName
    })
  });
});
router.get('/cricket/fixtures/:date', function(req, res)
{
  var date = req.params.date;

  axios.get(baseUrl + '/api/cricket/?met=Fixtures&APIkey=' + apiKey + '&from=' + date + '&to=' + date)
  .then(function(response)
  {
    res.render('fixtures', 
    {
      'sport': 'cricket',
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