const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const chalk = require('chalk');



class GasCommand extends Command {
    constructor() {
        super('gas', {
            aliases: ['gas', 'g'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'Etheruem Gas Tracker'
            },
            args: [
                {
                    id: 'channel',
                }
            ]
        });
    }

    async exec(message) {

        console.log(chalk.green("Ethereum gas rates requested by  " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        const getGas = async () => {

            const result = await fetch(`https://www.gasnow.org/api/v3/gas/price`)
            const json = await result.json()
            return json
        }
        const getPrice = async () => {

            const result = await fetch(`https://api.wazirx.com/api/v2/tickers/ethusdt`)
            const json2 = await result.json()
            return json2
        }


        let com = await getGas()
        let price = await getPrice()
        let ethUSDPrice = price.ticker.buy
        let rapid = com.data.rapid / 1000000000;
        let rapidUSD = rapid / 1000000000 * 21000 * ethUSDPrice;
        let fast = com.data.fast / 1000000000;
        let fastUSD = fast / 1000000000 * 21000 * ethUSDPrice;
        let standard = com.data.standard / 1000000000;
        let standardUSD = standard / 1000000000 * 21000 * ethUSDPrice;
        let slow = com.data.slow / 1000000000;
        let slowUSD = slow / 1000000000 * 21000 * ethUSDPrice;

        let embed = new Discord.MessageEmbed()
            .setTitle(`Ethereum Gas Tracker`)
            .addField("Slow:", `${slow.toFixed(0)} gwei\n$${slowUSD.toFixed(2)}\n10+ minutes \u200B\u200B`, true)
            .addField("Standard:", `${standard.toFixed(0)} gwei\n$${standardUSD.toFixed(2)}\n~ 3 minutes \u200B\u200B`, true)
            .addField("Fast:", `${fast.toFixed(0)} gwei\n$${fastUSD.toFixed(2)}\n1 minute \u200B\u200B`, true) //Skipped fast to save embed space
            .addField("Rapid:", `${rapid.toFixed(0)} gwei\n$${rapidUSD.toFixed(2)}\n~ 15 seconds \u200B\u200B`, true)
            .setColor('#1b51be')
            .setThumbnail('https://kittyhelper.co/local/templates/main/images/ETHgas.png')
            .setFooter('Powered by Gas Now', 'https://static-s.aa-cdn.net/img/mac/1532358105/cbcb05e8a75c15b31162e76f2be822a0?v=1');

        try {
            message.channel.send({ embed });
        }
        catch (rej) {
            message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
            console.log(chalk.red('Error sending eth gas response embed: ' + chalk.cyan(rej)));
        }

    }

}

module.exports = GasCommand;