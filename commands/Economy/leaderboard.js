const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const mongoCurrency = require('discord-mongo-currency');



class LeaderBoardCommand extends Command {
    constructor() {
        super('leaderboard', {
            aliases: ['leader', 'ldr'],
            channel: 'guild',
            category: 'Economy',
            description: {
                content: 'This provides the server leaderboard with the details of how rich everyone is'
            },

        });
    }

    async exec(message) {

        const leaderboard = await mongoCurrency.generateLeaderboard(message.guild.id, 10);

        if (leaderboard.length < 1) return message.channel.send("Nobody's on the leaderboard.");
        
        
        const mappedLeaderboard = leaderboard.map(i => `${this.client.users.cache.get(i.userId) ? this.client.users.cache.get(u.userId) : "Nobody"} - ${i.coinsInWallet}`);

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}\'s Leaderboard`)
            .setDescription(`${mappedLeaderboard.join('\n')}`);

        message.channel.send(embed);
    }
}

module.exports = LeaderBoardCommand;

