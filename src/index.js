const { configSV } = require('./config/configSV');
require(('./services/dbConnection'));
const app = require('./app');
const logger = require('./utils/logger');

app.listen(configSV.port,() => {
  logger.info('****Welcome to X-Men analyze DNA Api****');
  console.log('config', configSV.hostname)
  logger.info(`Server running on the port ${configSV.port}`);
}); 