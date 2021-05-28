const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const chalk = require('chalk');


class FgCommand extends Command {
    constructor() {
        super('trending', {
            aliases: ['trending', 'trend', 'trends'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'Top-7 trending coins on CoinGecko as searched by users in the last 24 hours'
            }
        });
    }

    async exec(message) {

        console.log(chalk.green("Trending list was requested by " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        const color = '#1b51be';
        const getPrice = async () => {
            
            const result = await fetch(`https://api.wazirx.com/api/v2/tickers/btcusdt`)
            const json = await result.json()
            return json
        }
        let com = await getPrice()
        const getTrend = async () => {

            const result = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
            const json = await result.json()
            return json
        }
        let ticker = await getTrend();

        var timestamp = Date.now()
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var btcPrice = com.ticker.buy;

        // ------------check if the ticker was fetched-------------
        console.log(ticker.coins[0].item.id)
        let j = ticker.coins.length
        let logoTop = ticker.coins[0].item.large;
        console.log(j)

        let embed = new Discord.MessageEmbed()
            .setTitle("Top Trending Right Now!!").setURL('https://discord.com/api/oauth2/authorize?client_id=844842149006802944&permissions=4027055184&redirect_uri=http%3A%2F%2Flocalhost%3A5000&scope=bot')
            .setDescription(`Top-7 trending coins on CoinGecko as searched by users in the last 24 hours`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor(color)
        for (let i = 0; i < j; i++) {
            let rank = ticker.coins[i].item.score + 1;
            let name = ticker.coins[i].item.name;
            let symbol = ticker.coins[i].item.symbol;
            let price = ticker.coins[i].item.price_btc;

            embed.addField(`'\u200b'`, `Rank: ${rank} \nName: ${name}\nSymbol: ${symbol}\nPrice: $${(price*btcPrice).toFixed(8)}`)

        }
        embed.addField(`\u200b`, 'Image of No. 1 Ranked coin logo')
        embed.setImage(`${logoTop}`)
        embed.setFooter(`Today at ${hours}:${minutes}:${seconds}`);

        message.channel.send({ embed }).catch(function (rej) {
            message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
            console.log(chalk.red('Error sending trending list! : ' + chalk.cyan(rej)));
        });


    }
}

module.exports = FgCommand;

