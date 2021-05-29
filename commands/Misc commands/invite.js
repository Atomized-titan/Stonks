const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const chalk = require('chalk');



class InviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite', 'summon'],
            channel: 'guild',
            category: 'Misc Commands',
            description: {
                content: 'Get a pre-permissioned link to add Stonks to your own server!'
            }
        });
    }

    async exec(message) {
        const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=844842149006802944&permissions=4026924112&redirect_uri=http%3A%2F%2Flocalhost%3A5000&scope=bot`
        console.log(chalk.green("Bot Invite link requested by " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        message.channel.send("Hi there! You can add me to your server with the following link. Please keep the requested permissions checked to ensure" +
            " that I'm able to work fully! \n<" + inviteLink + ">");

        
    }

}

module.exports = InviteCommand;