const { configSV } = require('./config/configSV');
require('dotenv').config();
require(('./services/dbConnection'));
const app = require('./app');
const logger = require('./utils/logger');

app.listen(configSV.port,() => {
  logger.info('****Welcome to X-Men analyze DNA Api****');
  console.log('config', process.env.npm_config_production)
  logger.info(`Server running on the port ${configSV.port}`);
}); 