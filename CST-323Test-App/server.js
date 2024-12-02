require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MySQL DB
const { connect } = require('./lib/db/conn');
connect();

// Create API Routes
const { createPostRoutes } = require('./lib/routes');
createPostRoutes(app);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build', 'index.html')));
}

// For testing local functionality
if (process.env.NODE_ENV !== 'production') {
  app.get('/ping', (req, res) => res.send('pong'));
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
