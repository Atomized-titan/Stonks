const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const finnhub = require('finnhub');

class ConvertCommand extends Command {
    constructor() {
        super('convert', {
            aliases: ['convert', 'cv'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'converts value of one coin into value in terms of another coin using CG prices'
            },
            args: [
                {
                    id: 'amount',

                },
                {
                    id: 'coin1',
                },
                {
                    id: 'coin2'
                }
            ]
        });
    }

    async exec(message, args) {

        // Finnhub API client
        const api_key = finnhub.ApiClient.instance.authentications.api_key;
        api_key.apiKey = 'c2qbcmiad3ickc1lg2h0';
        const finnhubClient = new finnhub.DefaultApi();

        const getMC = async () => {

            const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`)
            const json = await result.json()
            return json
        }
        let ticker = await getMC();

        let fiatPairs = ["USD", "CAD", "EUR", "AED", "JPY", "CHF", "CNY", "GBP", "AUD", "NOK", "KRW", "JMD", "RUB", "INR"];

        if (!args.coin1 || !args.coin2 || !args.amount || isNaN(args.amount)) {
            if (args.amount && isNaN(args.amount)) {
                message.channel.send("Invalid amount entered.");
            }
            message.channel.send("**Here's how to use the currency conversion command:**\n " +
                ":small_blue_diamond: Format: `.s cv <quantity> <FROM coin> to <TO coin>`\n " +
                ":small_blue_diamond: Examples: `.s cv 20 eth usd`  `.s cv 10 usd cad`\n " +
                ":small_blue_diamond: Supported cryptos: `All CoinGecko-listed coins`\n " +
                ":small_blue_diamond: Supported fiat currencies: `" + fiatPairs + "`");
            return;
        }

        coin1 = coin1.toUpperCase() + "";
        coin2 = coin2.toUpperCase() + "";
        let isForexPairingCoin1 = false;
        let isForexPairingCoin2 = false;
        let forexRates = null;

        let amount = args.amount.replace(/,/g, '');

        finnhubClient.forexRates({ "base": "USD" }, async (error, data, response) => {
            if (error) { console.error(error); return; }
            forexRates = data.quote;

            if (fiatPairs.includes(coin1)) {
                isForexPairingCoin1 = true;
            }
            if (fiatPairs.includes(coin2)) {
                isForexPairingCoin2 = true;
            }
            console.log(chalk.green("Currency conversion tool requested by " + chalk.yellow(message.author.username) + " for " + chalk.cyan(coin1) + " --> " + chalk.cyan(coin2)));
            let found1 = (isForexPairingCoin1) ? true : false;
            let found2 = (isForexPairingCoin2) ? true : false;
            if (!found1 || !found2) {
                for (let i = 0, len = ticker.length; i < len; i++) {
                    if (!found1 && ticker[i].symbol.toUpperCase() == coin1) {
                        found1 = true;
                    }
                    if (!found2 && ticker[i].symbol.toUpperCase() == coin2) {
                        found2 = true;
                    }
                }
            }



            
        })



    }
}

module.exports = ConvertCommand;

