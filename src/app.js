const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dnaRoutes = require('./routes/dnaRoutes');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.json()); 

// Routes
app.use('/', dnaRoutes);

module.exports = app;