const { Command } = require('discord-akairo');

class ServersCommand extends Command {
    constructor() {
        super('servers', {
            aliases: ['servers', 'servrs'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the number of servers the bot is a part of and ho many members are there in it'
            }
        });
    }

    async exec(message) {

        this.client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount}`)
        })

    }
}

module.exports = ServersCommand;

