require('dotenv').config();

const configSV = {
    hostname: process.env.HOSTNAME || 'localhost',
    port: process.env.PORT || 4000
}

module.exports = { configSV };