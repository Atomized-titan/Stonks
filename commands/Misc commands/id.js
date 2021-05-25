const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');


class GasCommand extends Command {
    constructor() {
        super('d', {
            aliases: ['id'],
            channel: 'guild',
            category: 'Misc Commands',
            description: {
                content: 'Etheruem Gas Tracker'
            }
        });
    }

    async exec(message) {
        message.author.send("Your ID is `" + message.author.id + "`.");
    }

}

module.exports = GasCommand;