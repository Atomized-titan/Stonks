const { Command } = require('discord-akairo');

class ClearCommand extends Command {
    constructor() {
        super('clear', {
            aliases: ['clear', 'c'],
            channel: 'guild',
            category: 'Utilities',
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
        let num = 2;
        console.log(args.coin)
        if (args.coin[0]) {
            //add 1 to delete clear itself
            num = parseInt(args.coin[0]) + 1;
        }
        console.log(num);
        message.channel.bulkDelete(num);
        message.channel.send(`Deleted ${args.coin[0]} posts for you`);

    }
}

module.exports = ClearCommand;