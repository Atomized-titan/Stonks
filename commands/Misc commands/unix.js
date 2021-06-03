const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const chalk = require('chalk');


class UnixCommand extends Command {
    constructor() {
        super('unix', {
            aliases: ['unix'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'Convert UNIX timestamp to date.'
            },
            args:[
                {
                    id: 'timestamp'
                }
            ]

        });
    }

    async exec(message,args) {

        console.log(chalk.green('UNIX conversion was requested by ' + chalk.yellow(message.author.username)));

        var date = new Date(parseInt(args.timestamp));
        message.channel.send(`${date}`)
       
    }
}

module.exports = UnixCommand;

