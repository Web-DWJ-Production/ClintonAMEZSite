var express = require('express');
var router = express.Router();
var data = require('../services/data.service');

/* get announcements */
function getAnnouncements(req, res){ data.getAnnouncements(req, res); }

/* get events */
function getEvents(req, res){ data.getEvents(req, res); }

/* get all ministries */
function getAllMinistries(req, res){ data.getAllMinistries(req, res); }

/* get spotlight ministries */
function getSpotlightMinistries(req, res){ data.getSpotlightMinistries(req, res); }

/* get individual ministry */
function getIndMinistry(req, res){ data.getIndMinistry(req, res); }

/* get galleries */
function getGalleries(req, res){ data.getGalleries(req, res); }

/* get individual ministry */
function getIndGallery(req, res){ data.getIndGallery(req, res); }


/* Routes */
router.get('/getAnnouncements', getAnnouncements);

router.post('/getEvents', getEvents);

router.get('/getAllMinistries', getAllMinistries);
router.get('/getSpotlightMinistries', getSpotlightMinistries);
router.post('/getIndMinistry', getIndMinistry);

router.get('/getGalleries', getGalleries);
router.post('/getIndGallery', getIndGallery);

module.exports = router;