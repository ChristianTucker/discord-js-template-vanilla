const BaseCommand = require('./BaseCommand');

class Uptime extends BaseCommand {
    name = 'uptime';
    description = 'Responds with the bot\'s current uptime.';

    execute({ client, msg }) {
        try {
            let totalSeconds = (client.uptime / 1000)
            const days = Math.floor(totalSeconds / 86400)
            const hours = Math.floor(totalSeconds / 3600)

            totalSeconds %= 3600

            const minutes = Math.floor(totalSeconds / 60)
            const seconds = totalSeconds % 60

            return msg.channel.send(`${days.toFixed(0)} days, ${hours.toFixed(0)} hours, ${minutes.toFixed(0)} minutes and ${seconds.toFixed(0)} seconds`)
        } catch (error) {
            console.error(`${msg.author.username}: ${msg.content} >> ${error.stack}`)
            return msg.channel.send(`An error occured while getting the bot's uptime.\n\`${error.message}\``)
        }
    }
}

module.exports = Uptime;