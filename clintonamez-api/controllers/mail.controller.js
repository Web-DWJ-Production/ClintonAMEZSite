var express = require('express');
var router = express.Router();
var mail = require('../services/mail.service.js');

router.post('', send);
module.exports = router;

function send(req, res) { mail.send(req, res) };