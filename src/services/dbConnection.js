const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(() => {
  logger.info('Database is connected');
})
.catch(error => {
  console.log(error);
})