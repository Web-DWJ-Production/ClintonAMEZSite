const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();


const port = process.env.PORT || '7777';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'build')));
// Set Cors Header
app.use((req, res, next) => { res.setHeader('Access-Control-Allow-Origin', '*'); next();  });

// Set our api routes
app.use('/api', require('./server/controllers/routes.controller.js'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

//Get port from environment and store in Express.
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Site running on localhost:${port}`));