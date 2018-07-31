var express = require('express');
var router = express.Router();
var ministry = require('../services/ministry.service');

/*
    Routes
    
     -- Individual Photoset --
    Get: Individual or Tree
    Post: Update Individual
    Put: Add Individual
    Delete: Remove Individual

*/

router.get('/:ministryId', getMinistries);
module.exports = router;

/* Get all of the photosets for the user */
function getMinistries(req, res){ ministry.all.getById(req, res); }