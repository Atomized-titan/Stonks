const { Command } = require('discord-akairo');
const mongoCurrency = require('discord-mongo-currency');
const Discord = require('discord.js')


class FineCommand extends Command {
    constructor() {
        super('fine', {
            aliases: ['fine'],
            channel: 'guild',
            category: 'Economy',
            description: {
                content: 'This provides your balance of Stonkcoins'
            },
            args: [{

                id: 'member'

            },
            {
                id: 'amount'
            }
            ]

        });
    }

    async exec(message, args) {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('**Only The SERVER ADMINS have Access to This Command!**')


        const member = message.mentions.users.first();
        if(!member) return message.channel.send('You need to enter a valid member name to deduct the coins to! \n Example \`.s fine @someone <amount>\`')
        const memberId = member.id;
        const amount = args.amount

        if(!amount) return message.channel.send('You need to enter a valid amount!')
        if(!args.member && !amount && !member) return message.channel.send('please enter a valid command. Example \`.s give @someone <amount>\`')

        if(amount.isNaN) return ;


        await mongoCurrency.deductCoins(memberId, message.guild.id, args.amount)
        message.channel.send(`I just fined ${member} and deducted \`${amount}\` Stonkcoins`)



    }
}

module.exports = FineCommand;

