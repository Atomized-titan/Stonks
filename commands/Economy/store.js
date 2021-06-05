const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const db = require('quick.db')


class StoreCommand extends Command {
    constructor() {
        super('store', {
            aliases: ['store'],
            channel: 'guild',
            category: 'Economy',
            description: {
                content: 'Displays the srore - all available items to buy and their prices'
            },

        });
    }

    async exec(message) {


        const Embed = new Discord.MessageEmbed()
            .setTitle("The store!")
            .setDescription("Car - 500 coins \n Watch - 250 coins")
            .setColor('#ea0215')
            .setTimestamp();

        message.channel.send(Embed);

    }
}

module.exports = StoreCommand;

