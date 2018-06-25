var express = require('express');
var router = express.Router();
var media = require('../services/media.service');

/*
    Routes
    
     -- Individual Photoset --
    Get: All Photos in Set
    Post: Add Photo to Set
    Put: Set Primary Photo
    Delete: Remove Photo From Set

*/

router.post('', getPhotos);
module.exports = router;

/* Get all of the photosets for the user */
function getPhotos(req, res){ media.photo.getPhotos(req, res); }