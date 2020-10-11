const BaseCommand = require('./BaseCommand');
const useFetch = require('../utils/useFetch');

const correctDate = (time) => {
    let date = new Date(time)
    date = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))

    return date
}

class Events extends BaseCommand {
    name = 'events';
    description = 'Displays a list of active events by date.';

    async execute({ client, msg }) {
        try {
            const eventsData = await useFetch('events')
                .then(val => Object.values(val))
                .then(events => events.filter(({ fired }) => !fired))
                .then((events) => events.length > 0 && events);

            if (!eventsData) return msg.channel.send('There aren\'t any active events right now.')

            const calendar = []; 
            eventsData.forEach((event) => {
                const eventDate = (correctDate(event.time)).toLocaleDateString('default', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                })

                const [dateRange] = calendar.filter(({ date: rangeDate }) => rangeDate === eventDate)
                if (dateRange) {
                    calendar[calendar.indexOf(dateRange)].events.push(event)
                } else {
                    calendar.push({ date: eventDate, events: [event], })
                }
            })

            const embed = {
                title: 'Active Events',
                url: 'https://projectmodern.gg/events',
                color: 0xf84525,
                timestamp: new Date(),
                footer: {
                    text: '!events'
                },
                fields: calendar.map(({ date, events }) => {
                    return {
                        name: date,
                        value: events.map(({ name, id, description, time, platform }) => [
                            `**[${name}](https://projectmodern.gg/events/${id})**`,
                            description,
                            `**Time**: ${new Date(time).toLocaleTimeString('default', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZoneName: 'short',
                            })}`,
                            `**Platform**: ${platform}`,
                            `[Signup](https://projectmodern.gg/events/signup/${id})\n`,
                        ].join('\n')),
                    }
                }),
            }

            return msg.channel.send({ embed })
        } catch (error) {
            console.error(`${msg.author.username}: ${msg.content} >> ${error.stack}`)
            return msg.channel.send(`An error occured while fetching events.\n\`${error.message}\``)
        }
    }
}

module.exports = Events;