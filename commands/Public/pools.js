const { Command } = require('discord-akairo');
const chalk = require('chalk');
const Discord = require('discord.js')
const pagination = require('discord.js-pagination')



class PoolsCommands extends Command {
    constructor() {
        super('pools', {
            aliases: ['pools', 'pool'],
            channel: 'guild',
            category: 'Mining',
            description: {
                content: 'Top Bitcoin mining pools'
            }
        });
    }

    async exec(message) {

        console.log(chalk.green("Mining pool list was requested by  " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        const page1 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 1/4)')
            .setDescription(':first_place: #1 [antpool.com](https://www.antpool.com) - 20.04 EH/s (15.94%) \n :second_place: #2 [www.poolin.com](https://www.poolin.com) - 15.66 EH/s (12.46%)\n :third_place: #3 [www.f2pool.com](https://www.f2pool.com) - 15.21 EH/s (12.10%)\n :medal: #4 [pool.btc.com](https://pool.btc.com) - 13.99 EH/s (11.13%)\n :medal: #5 [pool.viabtc.com](https://pool.viabtc.com) - 11.96 EH/s (9.52%)\n :medal: #6 [pool.binance.com](https://pool.binance.com) - 11.36 EH/s (9.04%)\n :medal: #7 [www.huobipool.com](https://www.huobipool.com) - 4.91 EH/s (3.91%)\n :medal: #8 [slushpool.com](https://slushpool.com) - 4.30 EH/s (3.42%)\n :medal: #9 [www.1thash.top](https://www.1thash.top) - 3.80 EH/s (3.03%)\n :medal: #10 [pool.emcd.io](https://pool.emcd.io)- 1.49 EH/s (1.18%)\n :medal: #11 [www.okex.com](https://www.okex.com) - 1.27 EH/s (1.01%)\n :medal: #12 [firepool.com](https://firepool.com)- 1,003.64 PH/s (0.78%)\n :medal: #13 [sigmapool.com](https://sigmapool.com) - 843.27 PH/s (0.66%)\n :medal: #14 [easy2mine.com](https://easy2mine.com) - 608.58 PH/s (0.47%)\n :medal: #15 [www.spiderpool.com](https://www.spiderpool.com) - 583.13 PH/s (0.45%)')

        const page2 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 2/4)')
            .setDescription('this is an under construction example for page 2')

        const page3 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 3/4)')
            .setDescription('this is an example under construction for page 3)')
        const page4 = new Discord.MessageEmbed()
            .setTitle(':pick: Top Bitcoin mining pools (page 4/4)')
            .setDescription('this is an example under construction for page 4)')

        const pages = [
            page1,
            page2,
            page3,
            page4
        ]
        const emoji = ["⏪", "⏩"]
        const timeout = '100000'
        pagination(message, pages, emoji, timeout)


    }
}

module.exports = PoolsCommands;