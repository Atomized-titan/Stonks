const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');


class PriceCommand extends Command {
    constructor() {
        super('price', {
            aliases: ['price', 'p'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'This provides the price and other details of a specific coin'
            },
            args: [
                {
                    id: 'coin',
                    type: 'string'

                }
            ]
        });
    }

    async exec(message, args) {

        const getPrice = async () => {
            console.log(args.coin)
            const result = await fetch(`https://api.wazirx.com/api/v2/tickers/${args.coin}`)
            const json = await result.json()
            return json
        }
        let com = await getPrice()
        
        console.log(com)
        const stamp = new Date(com.at * 1000);
        const time = stamp.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
        console.log(time)

        let buy = com.ticker.buy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let sell = com.ticker.sell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let low = com.ticker.low.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let high = com.ticker.high.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let last = com.ticker.last.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let vol = com.ticker.vol.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let at = time;

        //   message.reply(`

        //   Buy: ${com.ticker.buy}
        //   Sell: ${com.ticker.sell}
        //   Low: ${com.ticker.low}
        //   High: ${com.ticker.high}
        //   Last: ${com.ticker.last}
        //   Vol: ${com.ticker.vol}
        //   at: ${com.at}

        //   `)

        if (args.coin.substring(args.coin.length - 3) === 'inr') {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${args.coin.toUpperCase()}`)
                .addField("Buy: ", ` ₹ ${buy}\n \u200B\u200B`, true)
                .addField("Sell: ", ` ₹ ${sell}\n \u200B\u200B`, true)
                .addField("Low: ", ` ₹ ${low}\n \u200B\u200B`, true)
                .addField("High: ", ` ₹ ${high}\n \u200B\u200B`, true)
                .addField("Last: ", ` ₹ ${last}\n \u200B\u200B`, true)
                .addField("Vol: ", ` ₹ ${vol}\n \u200B\u200B`, true)
                .addField("At: ", ` ${at}\n \u200B\u200B`, true)
                .setFooter('Powered by WazirX', 'https://wazirx.com/static/media/wazirx-logo-rounded.9bff9f42.png');

            try {
                message.channel.send({ embed });
            }
            catch (rej) {
                message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                console.log(chalk.red('Error sending price response embed: ' + chalk.cyan(rej)));
            }
        }
        else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${args.coin.toUpperCase()}`)
                .addField("Buy: ", ` $ ${buy}\n \u200B\u200B`, true)
                .addField("Sell: ", ` $ ${sell}\n \u200B\u200B`, true)
                .addField("Low: ", ` $ ${low}\n \u200B\u200B`, true)
                .addField("High: ", ` $ ${high}\n \u200B\u200B`, true)
                .addField("Last: ", ` $ ${last}\n \u200B\u200B`, true)
                .addField("Vol: ", ` $ ${vol}\n \u200B\u200B`, true)
                .addField("At: ", ` ${at}\n \u200B\u200B`, true)
                //.setColor('#1b51be')
                .setFooter('Powered by WazirX', 'https://wazirx.com/static/media/wazirx-logo-rounded.9bff9f42.png');


            try {
                message.channel.send({ embed });
            }
            catch (rej) {
                message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                console.log(chalk.red('Error sending price response embed: ' + chalk.cyan(rej)));
            }
        }

    }
}

module.exports = PriceCommand;

