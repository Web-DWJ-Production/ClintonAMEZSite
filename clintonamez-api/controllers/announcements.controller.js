var express = require('express');
var router = express.Router();
var announcements = require('../services/announcements.service');

/*
    Routes
    
     -- Announcements --
    Get: Get List Of Announcements
    Post: Update All Announcements
    Put: Upload Image for Individual Announcement
    Delete: Remove Individual Annoucement

*/

router.get('', getMinistries);
//router.post('', updateMinistry);
//router.put('', addMinistry);
//router.delete('', deleteMinistry);

module.exports = router;

/* Get all Announcements */
function getAnnouncements(req, res){ announcements.all.getList(req, res); }

/* Update Announcement List */
function updateAnnouncements(req, res){ announcements.all.update(req, res); }

/* Upload Announcement */
function uploadAnnouncement(req, res){ announcements.individual.add(req, res); }

/* Delete Announcements */
function deleteAnnouncement(req, res){ announcements.individual.delete(req, res); }