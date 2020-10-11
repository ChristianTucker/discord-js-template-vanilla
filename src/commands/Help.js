const BaseCommand = require('./BaseCommand');

class Help extends BaseCommand {
    name = 'help';
    description = 'Displays a list of this bot\'s commands.';

    execute({ client, msg }) {
        try {
            const embed = {
                title: 'Commands',
                description: 'Here are the commands that I can execute:',
                color: 0xf84525,
                timestamp: new Date(),
                footer: {
                    text: '!help'
                },
                fields: client.commands.map(({ name, args, description }) => {
                    return {
                        name: `!${name}${args ? args.map((arg) => ` \`${arg}\``) : ''}`,
                        value: description,
                    }
                }),
            }

            return msg.channel.send({ embed })
        } catch (error) {
            console.error(`${msg.author.username}: ${msg.content} >> ${error.stack}`)
            return msg.channel.send(`An error occured while listing commands.\n\`${error.message}\``)
        }
    }
}

module.exports = Help;