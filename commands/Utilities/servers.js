const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const util = require('util');
const { ownerID } = require('../../config');

class ServersCommand extends Command {
    constructor() {
        super('servers', {
            aliases: ['servers', 'servrs'],
            channel: 'guild',
            ownerOnly: true,
            category: 'Developer Commands',
            description: {
                content: 'This provides the number of servers the bot is a part of and how many members are there in it. **Bot Owner only**'
            }
        });
    }

    async exec(message) {
        if(!message.member.hasPermission(`${ownerID}`)) return message.channel.send('Only The Stonks Owners have Access to This Command!')

        this.client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount}`)
        })

    }
}

module.exports = ServersCommand;

