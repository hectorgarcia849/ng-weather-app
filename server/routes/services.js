const express = require('express');
const servicesRouter = express.Router();
const _ = require('lodash');
const request = require('request');


servicesRouter.get('/weatherservice/hourly', (req, res) => {
  const lat = req.query['lat'];
  const lon = req.query['lng'];
  const units = req.query['mode'];
  const host = 'http://api.openweathermap.org';
  const url = `${host}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPENWEATHER_API_KEY}`;
  request(url, (err, response) => {
    if(err) {
      res.status(400).send(e);
    } else {
      res.send(response);
    }
  });
});

servicesRouter.get('/weatherservice/daily', (req, res) => {
  const lat = req.query['lat'];
  const lon = req.query['lng'];
  const units = req.query['mode'];
  const host = 'http://api.openweathermap.org';
  const url = `${host}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPENWEATHER_API_KEY}`;
  request(url, (err, response) => {
    if(err) {
      res.status(400).send(e);
    } else {
      res.send(response);
    }
  });
});

servicesRouter.get('/geocodeservice/geocode/reverserequest', (req, res) => {
  const lat = req.query['lat'];
  const lng = req.query['lng'];
  const host = "http://api.opencagedata.com";
  const url = `${host}/geocode/v1/json?q=${lat}+${lng}&key=${process.env.OPENCAGE_API_KEY}`;
  request(url, (err, response) => {
    if(err) {
      res.status(400).send(e);
    } else {
      res.send(response);
    }
  });
});

servicesRouter.get('/geocodeservice/geocode/request', (req, res) => {
  const address = req.query['address']
  const host = "http://api.opencagedata.com";
  const url = `${host}/geocode/v1/json?q=${address}&key=${process.env.OPENCAGE_API_KEY}`;
  request(url, (err, response) => {
    if(err) {
      res.status(400).send(e);
    } else {
      res.send(response);
    }
  });
});


servicesRouter.get('/mapservice', (req, res) => {
  res.send('mapservice');
});

module.exports = {servicesRouter};
