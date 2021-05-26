const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const chalk   = require('chalk');



class GasCommand extends Command {
    constructor() {
        super('id', {
            aliases: ['id'],
            channel: 'guild',
            category: 'Misc Commands',
            description: {
                content: "Get your unique Discord ID number DM'd to you"
            }
        });
    }

    async exec(message) {
        console.log(chalk.green("Discord ID DM'd to  " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        message.author.send("Your ID is `" + message.author.id + "`.");
    }

}

module.exports = GasCommand;