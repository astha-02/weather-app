const express = require('express');
const argv = require('yargs').argv;
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '*****************';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})


app.post('/', function (req, res) {
  let city = req.body.city;
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${4e2ed6134803b62d353e9dd1568c587c}'

  request(url, function (err, response, body) {
    console.log(err)
    console.log(body)
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let weatherTextExpanded = `It's ${weather.main.temp} degrees, with
          ${weather.main.humidity}% humidity in ${weather.name}!`;
        res.render('index', {weather: weatherTextExpanded, error: null});
      }
    }
  });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
