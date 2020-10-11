const { Bot } = require('../bot'); 

module.exports.run = function run(client) {
    client.user.setActivity('projectmodern.gg | !help');
    console.log(`Connected as ${client.user.tag}`);
}
