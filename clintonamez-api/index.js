const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
const path = require('path');
const fs = require('fs');
const PORT = 5000;
var DIR = path.join(__dirname, 'upload/');


express()
  .use(express.json())
  .use(bodyParser.json({limit: '50MB'}))
  //.use(bodyParser.urlencoded({limit: '50MB', extended: true}))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  /* For Dev Only */
  .use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  })
  .use(multer({
    dest: DIR,
    rename: function (fieldname, filename) {
      return filename + Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
  }).any())
  .use('/api/mail', require('./controllers/mail.controller.js'))
  .use('/api/mediaSet',require('./controllers/photoset.controller.js'))
  .use('/api/media',require('./controllers/photo.controller.js'))
  .use('/api/ministry',require('./controllers/ministry.controller.js'))
  .use('/api/events',require('./controllers/events.controller.js'))
  .use('/api/announcements',require('./controllers/announcements.controller.js'))
  .listen(PORT, () => {
    console.log('API is listening on 5000');

    /* Create the app-initialized file to signal to NGINX the api is ready.*/
    fs.writeFileSync('../tmp/app-initialized');
  })