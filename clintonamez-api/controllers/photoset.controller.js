var express = require('express');
var router = express.Router();
var media = require('../services/media.service');

/*
    Routes
    
     -- All Photo Sets --
    Get: All Photosets
    Post: Create Photoset with Images
    Delete: Remove Photoset

*/

router.get('', getAllSets);
module.exports = router;

/* Get all of the photosets for the user */
function getAllSets(req, res){ media.photoset.getAllSets(req, res); }