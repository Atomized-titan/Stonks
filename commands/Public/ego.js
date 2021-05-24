const { Command } = require('discord-akairo');

class EgoCommand extends Command {
    constructor() {
        super('ego', {
            aliases: ['ego', 'egi'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This boosts your ego'
            }
        });
    }

    async exec(message) {

        message.react('😄')
        message.reply('Dayum son, thats crazyyyy')



    }
}

module.exports = EgoCommand;

