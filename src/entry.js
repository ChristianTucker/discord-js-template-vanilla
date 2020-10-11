const Bot = require('./bot');
const config = require('./config');

const bot = new Bot();

bot.login(config.token); 
bot.loadEvents(__dirname);
bot.loadCommands(__dirname);

module.exports = bot; 