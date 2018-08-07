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
router.post('', updateMinistry);
//router.put('', addMinistry);
router.delete('', deleteMinistry);

module.exports = router;

/* Get all or individual Ministry based on Id */
function getMinistries(req, res){ ministry.all.getById(req, res); }

/* Update Ministry By ID */
function updateMinistry(req, res){ ministry.all.updateById(req, res); }

/* Update Ministry By ID */
function addMinistry(req, res){ ministry.all.addById(req, res); }

/* Delete Ministry By ID */
function deleteMinistry(req, res){ ministry.all.deleteById(req, res); }