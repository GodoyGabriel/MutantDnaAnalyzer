const { configSV } = require('./config/configSV');
const app = require('./app');
const logger = require('./utils/logger');

app.listen(configSV.port, configSV.hostname, () => {
  logger.info('****Welcome to X-Men analyze DNA Api****');
  logger.info(`Server running at http://${configSV.hostname}:${configSV.port}/`);
}); 