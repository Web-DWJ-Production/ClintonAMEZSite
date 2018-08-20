var express = require('express');
var router = express.Router();
var media = require('../services/media.service');


/*
    Routes
    
     -- Individual Photoset --
    Get: All Photos in Set
    Post: Get Photoset Id for upload
    Put: Set Primary Photo
    Delete: Remove Photo From Set

*/

router.get('/:setId', getPhotos);

router.post('', uploadPhotos);
module.exports = router;

/* Get all of the photosets for the user */
function getPhotos(req, res){ media.photo.getPhotos(req, res); }

/* Get id from photoset for upload by name */
function getSetId(req, res){ media.photoset.getSetId(req, res); }

/* Upload Files to Photoset*/
function uploadPhotos(req,res) { media.photoset.uploadPhotos(req, res);} 
