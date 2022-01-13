const { Command } = require('discord-akairo');
const { ownerID } = require('../../config');
const util = require('util');
class ClearCommand extends Command {
    constructor() {
        super('clear', {
            aliases: ['clear'],
            channel: 'guild',
            category: 'Developer Commands',
            description: {
                content: 'Clears messsages above'
            },
            args: [
                {
                    id: 'code',
                }
            ]
        });
    }

    async exec(message, args) {
        if(!message.member.hasPermission(`${ownerID}`)) return message.reply('Only The Stonks Owners have Access to This Command!')
        //if (!args.code) return message.util.reply('No code provided!');

        // let num = 2;
        // console.log(args.code)
        // if (args.code[0]) {
        //     //add 1 to delete clear itself
        //     num = parseInt(args.code[0]) + 1;
        // }
        // console.log(num);
        // message.channel.bulkDelete(num);
        // message.channel.send(`Deleted ${args.code[0]} posts for you`);
        message.channel.send('Command under construction!')

    }
}

module.exports = ClearCommand;