require('dotenv').config();

const configSV = {
    hostname: process.env.HOSTNAME_SV,
    port: process.env.HOSTNAME_PORT
}

module.exports = { configSV };