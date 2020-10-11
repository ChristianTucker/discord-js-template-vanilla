const { Bot } = require('../bot');
const config = require('../config'); 

module.exports.run = function run(client, msg) {
    if (msg.guild.id !== config.guild) return
    if (msg.author.bot || !msg.content.startsWith('!')) return
  
    if (!config.isProduction) console.log(`${msg.author.username}#${msg.author.discriminator} >> ${msg.content}`)
  
    const args = msg.content.substring(1).split(' ')
    const cmdName = args.shift().toLowerCase()
    const command = client.commands.find(cmd => cmd.name === cmdName)
  
    if (command) command.execute({ client, msg, args })
}