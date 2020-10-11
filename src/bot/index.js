const { Client } = require('discord.js');
const { readdir } = require('fs'); 
const { sep } = require('path');

module.exports = class Bot extends Client 
{
    constructor(options) {
        super(options);
        this.commands = [];
    }

    loadCommands(dir) {
        readdir(`${dir}${sep}commands`, (err, files) => {
            if (err) return console.log(err)

            files.forEach(f => {
                if(f == 'BaseCommand.js') return;
                delete require.cache[require.resolve(`${dir}${sep}commands${sep}${f}`)]
                const cmd = require(`${dir}${sep}commands${sep}${f}`);
                const cmdName = f.split('.').shift()
                this.commands.push(new cmd())
                console.log(`Loading Command: ${cmdName}`)
            })
        })
    }

    loadEvents(dir) {
        readdir(`${dir}${sep}events`, (err, files) => {
            if (err) return console.log(err)

            files.forEach(f => {
                const event = require(`${dir}${sep}events${sep}${f}`)
                const eventName = f.split('.').shift()
                console.log(`Loading Event: ${eventName}`)
                this.on(eventName, (...args) => event.run(this, ...args))
            })
        })
    }
}