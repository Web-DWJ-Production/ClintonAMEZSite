var express = require('express');
var router = express.Router();
var events = require('../services/events.service');

/*
    Routes
    
     -- Individual Photoset --
    Post: Events

*/

router.post('', getEvents);

module.exports = router;

/* Get all events in date range */
function getEvents(req, res){ events.all.getEvents(req, res); }

