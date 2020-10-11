const { Console } = require('console');

require('dotenv').config(); 

console.log('token:', process.env.TOKEN);

const config = {
    guild: process.env.GUILD,
    isProduction: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
    secret: process.env.SECRET,
    token: process.env.TOKEN
};

module.exports = config; 