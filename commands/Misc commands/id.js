const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const chalk   = require('chalk');



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
        console.log(chalk.green("Discord ID DM'd to  " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        message.author.send("Your ID is `" + message.author.id + "`.");
    }

}

module.exports = GasCommand;