const { Command } = require('discord-akairo');
const chalk = require('chalk');
const Discord = require('discord.js')
const pagination = require('discord.js-pagination')



class PoolsCommands extends Command {
    constructor() {
        super('pools', {
            aliases: ['pools', 'pool'],
            channel: 'guild',
            category: 'Misc Commands',
            description: {
                content: 'Top Bitcoin mining pools'
            }
        });
    }

    async exec(message) {

        const page1 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 1/4)')
            .setDescription('This feature is under construction, stay tuned')

        const page2 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 2/4)')
            .setDescription('this is an example for page 2')

        const page3 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 3/4)')
            .setDescription('this is an example for page 3)')
        const page4 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 4/4)')
            .setDescription('this is an example for page 4)')

        const pages = [
            page1,
            page2,
            page3,
            page4
        ]
        const emoji = ["⏪", "⏩"]
        const timeout = '10000'
        pagination(message, pages, emoji, timeout)


    }
}

module.exports = PoolsCommands;