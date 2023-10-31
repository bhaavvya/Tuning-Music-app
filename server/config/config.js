const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({path: root('.env')});

module.exports = {
    PORT: process.env.PORT || 8888,
    DATABASE:process.env.DATABASE,
    SECRET_KEY:process.env.SECRET_KEY,
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
};