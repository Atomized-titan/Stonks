const Discord = require('discord.js')
const chalk = require('chalk');
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');





class McCommand extends Command {
    constructor() {
        super('marketcap', {
            aliases: ['marketcap', 'mc'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'This provides the Market Cap of a specific coin. Inputs: name, symbol, rank'
            },
            args: [
                {
                    id: 'coin'

                }
            ]
        });
    }

    async exec(message) {
        let success;
        // ------------------------------------abbreviateNumber function-----------------------------------------
        // function abbreviateNumber(value) {
        //     var newValue = value;
        //     if (value >= 1000) {
        //         var suffixes = ["", "k", "m", "b", "t"];
        //         var suffixNum = Math.floor(("" + value).length / 3);
        //         var shortValue = '';
        //         for (var precision = 2; precision >= 1; precision--) {
        //             shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
        //             var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
        //             if (dotLessShortValue.length <= 2) { break; }
        //         }
        //         if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
        //         newValue = shortValue + suffixes[suffixNum];
        //     }
        //     return newValue;
        // }
        function abbreviateNumber(num, fixed) {
            if (num === null) { return null; } // terminate early
            if (num === 0) { return '0'; } // terminate early
            fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
            var b = (num).toPrecision(2).split("e"), // get power
                k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
                c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
                d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
                e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
            return e;
        }
        // ---------------------------------------Number with commas function-------------------------------------------

        function numberWithCommas(x) {
            x = x.toString();
            var pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(x))
                x = x.replace(pattern, "$1,$2");
            return x;
        }

        //--------------------------------------Trim decimal plpaces function--------------------------------------
        function trimDecimalPlaces(x) {
            if (x > 10 && x.toString().indexOf('.') !== -1) {
                x = parseFloat(x);
                return x.toFixed(2); //shorten the decimal places
            }
            else {
                return x;
            }
        }






        let cur = '';
        cur = message.content.toLowerCase().replace('.s', '').replace('mc', '').replace('marketcap', '').trimStart().trimEnd();
        if(cur===''){
            message.channel.send('OOPS! add a parameter like \`.s mc ethereum\` or \`.s mc btc\` or a rank number like \`.s mc 7\`')
        }
        console.log(cur)
        if (cur === 'hammer') {
            message.channel.send('https://youtu.be/otCpCn0l4Wo?t=14'); return;
        }
        // -------------------------------Price function------------------------------------

        const getBTCPrice = async () => {

            const result = await fetch(`https://api.wazirx.com/api/v2/tickers/btcusdt`)
            const json = await result.json()
            return json
        }

        let BTprice = await getBTCPrice()
        function convertToBTCPrice(priceUSD) {
            let BTCPrice = BTprice.ticker.sell;
            return priceUSD / BTCPrice;
        }

        const getETHPrice = async () => {

            const result = await fetch(`https://api.wazirx.com/api/v2/tickers/btcusdt`)
            const json = await result.json()
            return json
        }
        let ETPrice = await getETHPrice()
        function convertToETHPrice(priceUSD) {
            let ETHPrice = ETPrice.ticker.sell;
            return priceUSD / ETHPrice;
        }




        // -------------------------------Market cap function------------------------------------

        const getMC = async () => {

            const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`)
            const json = await result.json()
            return json
        }
        let ticker = await getMC();

        // -------------------------------Image/Logo function------------------------------------
        // console.log(chalk.green("Market cap of " + chalk.magentaBright(cur) + " was requested by " + chalk.yellow(message.author.username) + " in " + chalk.cyan(message.channel.guild.name)));
        // const getInfo = async () => {
        //     const result = await fetch(`https://api.coingecko.com/api/v3/coins/${cur}`)
        //     const json2 = await result.json()
        //     return json2
        // }
        // let com = await getInfo();
        // const logo = com.image.large;
        let priceBTC;
        let priceETH;

        let j = ticker.length;

        for (let i = 0; i < j; i++) {
            if (ticker[i].symbol === cur || ticker[i].name === cur || ticker[i].id === cur || ticker[i].market_cap_rank + '' === cur) {
                let name = ticker[i].name;
                let slug = ticker[i].id;
                let price = ticker[i].current_price;

                console.log(price)
                let percent = ticker[i].price_change_percentage_24h_in_currency;
                let rank = ticker[i].market_cap_rank;
                let logo = ticker[i].image;
                let percent7 = ticker[i].price_change_percentage_7d_in_currency;
                let percent30 = ticker[i].price_change_percentage_30d_in_currency;
                let percent1y = ticker[i].price_change_percentage_1y_in_currency;
                let mcappercent = ticker[i].market_cap_change_percentage_24h;
                let ath = ticker[i].ath;
                let athdate = (ticker[i].ath_date) ? ticker[i].ath_date.substring(0, 10) : ticker[i].ath_date;
                let percentath = ticker[i].ath_change_percentage;
                let low24hr = ticker[i].low_24h;
                let high24hr = ticker[i].high_24h;
                let symbol = ticker[i].symbol.toUpperCase();
                let volume = ticker[i].total_volume;
                let marketcap = ticker[i].market_cap;
                let supply = ticker[i].circulating_supply;
                let totalSupply = ticker[i].total_supply;
                let maxSupply = ticker[i].max_supply;
                let percent1h = ticker[i].price_change_percentage_1h_in_currency;
                let logoColor = '#1b51be';
                if (symbol == "eth") { priceETH = 1; } else { priceETH = convertToETHPrice(price).toFixed(6); }
                if (symbol == "btc") { priceBTC = 1; } else { priceBTC = convertToBTCPrice(price).toFixed(8); }


                let l1, l2, l3, l4, l5, l6, l71, l72, l73, l74, l75, l76, l81, l82, l83, l84, l85, l86, l87, l88;
                l1 = (rank) ? `MC Rank: #${rank}\n` : `MC Rank: n/a\n`;
                l2 = (marketcap) ? `Market Cap: ${abbreviateNumber(parseInt(marketcap), 1)} USD\n` : `Market Cap: n/a\n`;
                l3 = (volume) ? `24hr volume: ${abbreviateNumber(parseInt(volume), 1)} USD\n` : `24hr volume: n/a\n`;
                l4 = (supply) ? `In Circulation: ${numberWithCommas(parseInt(supply))} ${symbol}\n` : `In Circulation: n/a\n`;
                l5 = (totalSupply) ? `Total Supply: ${numberWithCommas(parseInt(totalSupply))} ${symbol}\n` : `Total Supply: n/a\n`;
                l6 = (maxSupply) ? `Max Supply: ${numberWithCommas(parseInt(maxSupply))} ${symbol}\n` : `Max Supply: n/a\n`;
                l71 = (price) ? `USD: \`${trimDecimalPlaces(parseFloat(price).toFixed(6))}\`\n` : `USD: n/a\n`;
                // l72 = (price)       ?  `24h H: \`${trimDecimalPlaces(parseFloat(high24hr).toFixed(6))}\`\n`      : `24h H: n/a\n`;
                // l73 = (price)       ?  `24h L: \`${trimDecimalPlaces(parseFloat(low24hr).toFixed(6))}\`\n`       : `24h L: n/a\n`;
                // l74 = (ath)         ?  `ATH: \`${trimDecimalPlaces(ath)} \`\n`                                   : `ATH: n/a\n`;
                l75 = (price) ? `BTC: \`${trimDecimalPlaces(priceBTC)}\`\n` : `BTC: n/a\n`;
                l76 = (price) ? `ETH: \`${trimDecimalPlaces(priceETH)}\`` : `ETH: n/a`;
                l81 = (percent1h || percent1h == 0) ? `1h: \u200B\u200B\u200B\u200B  \`${parseFloat(percent1h).toFixed(2)}%\`\n` : `1h:  n/a\n`;
                l82 = (percent || percent == 0) ? `24h: \`${parseFloat(percent).toFixed(2)}%\`\n` : `24h: n/a\n`;
                l83 = (percent7 || percent7 == 0) ? `7d: \u200B\u200B\u200B\u200B  \`${parseFloat(percent7).toFixed(2)}%\`\n` : `7d:  n/a\n`;
                l84 = (percent30 || percent30 == 0) ? `1m: \`${parseFloat(percent30).toFixed(2)}%\`\n` : `1m: n/a\n`;
                l85 = (percent1y || percent1y == 0) ? `1y: \u200B \`${parseFloat(percent1y).toFixed(2)}%\`` : `1y: n/a`;
                // l86 = (mcappercent || mcappercent == 0) ?  `MC 24h: \`${parseFloat(mcappercent).toFixed(2)}%\`\n`                    : `MC 24h: n/a\n`;
                // l87 = (percentath || percentath == 0)  ?  `From ATH: \`${parseFloat(percentath).toFixed(2)}%\`\n`                   : `From ATH: n/a\n`;
                // l88 = (athdate)     ?  `ATH day: \`${athdate}\``                                                 : `ATH day: n/a`;

                //assemble the final message as message embed object
                let embed = new Discord.MessageEmbed()
                    .addField(name + " (" + symbol + ")", l1 + l2 + l3 + l4 + l5 + l6, false)
                    .addField("Current Prices:", l71 + l75 + l76, true)
                    .addField("Price Changes:", l81 + l82 + l83 + l84 + l85, true)
                    .setColor(logoColor)
                    .setThumbnail(logo)
                    .setFooter('Powered by CoinGecko', 'https://i.imgur.com/EnWbbrN.png');

                //send it
                try {
                    message.channel.send({ embed });
                    sucess = true;

                }
                catch (rej) {
                   // message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                    console.log(chalk.red('Error sending MC response embed: ' + chalk.cyan(rej)));
                }

                console.log(name)
                console.log(slug)
                console.log(marketcap)
            }

        }
        if (!success) {
           // message.channel.send("Failed to find a CoinGecko coin associated with that input.\nTry again with either the full name, or the ticker symbol.");
            console.log(chalk.red(`Failed to find matching coin for input to mc command of: ${chalk.cyan(cur)}`));
        }

    }
}



module.exports = McCommand;

