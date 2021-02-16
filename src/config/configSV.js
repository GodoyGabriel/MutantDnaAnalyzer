require('dotenv').config();

const configSV = {
    hostname: process.env.HOSTNAME_SV || 'localhost',
    port: process.env.HOSTNAME_PORT || 4000
}

module.exports = { configSV };