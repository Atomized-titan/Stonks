const { Command } = require('discord-akairo');
const chalk   = require('chalk');



class DiscordCommand extends Command {
    constructor() {
        super('discord', {
            aliases: ['discord','dc'],
            channel: 'guild',
            category: 'Misc Commands',
            description: {
                content: 'Get a pre-permissioned link to the Stonks support server!'
            }
        });
    }

    async exec(message) {
        const inviteLink = `https://discord.gg/5YRr6qZwEj`
        console.log(chalk.green("Support server link requested by " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        message.channel.send("Hi there! Join the support server with the following link." +
        " If you have any questions ask them here! \n<" + inviteLink + ">");
    }

}

module.exports = DiscordCommand;