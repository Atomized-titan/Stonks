const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const mongoCurrency = require('discord-mongo-currency');



class BalanceCommand extends Command {
    constructor() {
        super('balance', {
            aliases: ['balance', 'bal'],
            channel: 'guild',
            category: 'Economy',
            description: {
                content: 'This provides your balance of Stonkcoins'
            },

        });
    }

    async exec(message) {

        const member = message.mentions.users.first() || message.author
        const memberId = member.id;
        const user = await mongoCurrency.findUser(memberId, message.guild.id); // Get the user from the database.

        const embed = new Discord.MessageEmbed()
            .setTitle(`${member.username}'s Balance`)
            .setDescription(`
            Wallet: ${user.coinsInWallet}
            Bank: ${user.coinsInBank}/${user.bankSpace}
            Total: ${user.coinsInBank + user.coinsInWallet}`
      );

        message.channel.send(embed);

    }
}

module.exports = BalanceCommand;

