const express = require('express')
const path = require('path')
const fs = require('fs')
const PORT = 5000

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  /* For Dev Only */
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use('/api/mail', require('./controllers/mail.controller.js'))
  .use('/api/mediaSet',require('./controllers/photoset.controller.js'))
  .use('/api/media',require('./controllers/photo.controller.js'))
  .use('/api/ministry',require('./controllers/ministry.controller.js'))
  .listen(PORT, () => {
    console.log('API is listening on 5000');

    /* Create the app-initialized file to signal to NGINX the api is ready.*/
    fs.writeFileSync('../tmp/app-initialized');
  })