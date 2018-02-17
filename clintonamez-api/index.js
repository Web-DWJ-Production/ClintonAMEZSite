const express = require('express')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => {
      console.log(`Listening on ${ PORT }`);

      // Create the app-initialized file to signal to NGINX the api is ready.
      fs.openSync('/tmp/app-initialized', 'w');
  })