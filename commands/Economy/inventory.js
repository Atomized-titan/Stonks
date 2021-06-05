const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const db = require('quick.db')


class InventoryCommand extends Command {
    constructor() {
        super('inventory', {
            aliases: ['inv'],
            channel: 'guild',
            category: 'Economy',
            description: {
                content: 'This provides the ping of the bot.'
            },

        });
    }

    async exec(message) {

        let items = await db.fetch(message.author.id);
        if (items === null) items = "Nothing"

        const Embed = new Discord.MessageEmbed()
            .addField('Inventory', items)
            .setColor('#ea0215')

        message.channel.send(Embed);

    }
}

module.exports = InventoryCommand;

