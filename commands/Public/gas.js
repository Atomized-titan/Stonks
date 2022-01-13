const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const axios = require('axios')
const rp = require('request-promise')
const chalk = require('chalk');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cheerio = require('cheerio');



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

        // console.log(chalk.green("Ethereum gas rates requested by  " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        // const getGas = async () => {

        //     // const result = await fetch(`https://www.gasnow.org/api/v3/gas/price`)
        //     const result = await fetch(`https://ethgasstation.info/api/ethgasAPI.json?`)
        //     const json = await result.json()
        //     return json
        // }
        // const getPrice = async () => {

        //     const result = await fetch(`https://api.wazirx.com/api/v2/tickers/ethusdt`)
        //     const json2 = await result.json()
        //     return json2
        // }


        // let com = await getGas()
        // let price = await getPrice()
        // let ethUSDPrice = price.ticker.buy
        // let rapid = com.rapid / 1000000000;
        // let rapidUSD = rapid / 1000000000 * 21000 * ethUSDPrice;
        // let fast = com.fast / 1000000000;
        // let fastUSD = fast / 1000000000 * 21000 * ethUSDPrice;
        // let standard = com.average / 1000000000;
        // let standardUSD = standard / 1000000000 * 21000 * ethUSDPrice;
        // let slow = com.safeLow / 1000000000;
        // let slowUSD = slow / 1000000000 * 21000 * ethUSDPrice;

        // let embed = new Discord.MessageEmbed()
        //     .setTitle(`Ethereum Gas Tracker`)
        //     .addField("Slow:", `${slow.toFixed(0)} gwei\n$${slowUSD.toFixed(2)}\n10+ minutes \u200B\u200B`, true)
        //     .addField("Standard:", `${standard.toFixed(0)} gwei\n$${standardUSD.toFixed(2)}\n~ 3 minutes \u200B\u200B`, true)
        //     .addField("Fast:", `${fast.toFixed(0)} gwei\n$${fastUSD.toFixed(2)}\n1 minute \u200B\u200B`, true) //Skipped fast to save embed space
        //     .addField("Rapid:", `${rapid.toFixed(0)} gwei\n$${rapidUSD.toFixed(2)}\n~ 15 seconds \u200B\u200B`, true)
        //     .setColor('#1b51be')
        //     .setThumbnail('https://kittyhelper.co/local/templates/main/images/ETHgas.png')
        //     .setFooter('Powered by Gas Now', 'https://static-s.aa-cdn.net/img/mac/1532358105/cbcb05e8a75c15b31162e76f2be822a0?v=1');

        // try {
        //     message.channel.send({ embed });
        // }
        // catch (rej) {
        //     message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
        //     console.log(chalk.red('Error sending eth gas response embed: ' + chalk.cyan(rej)));
        // }

        console.log(chalk.green("Etherscan gas requested by " + chalk.yellow(message.author.username)));
        axios.get('https://etherscan.io/gastracker')
            .then(res => {
                //collect the data from fields on the webpage
                const $ = cheerio.load(res.data)
                let slow_gwei = $("#spanLowPrice").text()
                let slow_usd_time = $("#divLowPrice > div:nth-child(3)").text()
                let avg_gwei = $("#spanAvgPrice").text()
                let avg_usd_time = $("#divAvgPrice > div:nth-child(3)").text()
                let fast_gwei = $("#spanHighPrice").text()
                let fast_usd_time = $("#divHighPrice > div:nth-child(3)").text()
                // console.log(nice)
                // let slow_gwei = dom.window.document.querySelector("#spanLowPrice").textContent;
                // let slow_usd_time = dom.window.document.querySelectorAll("#divLowPrice > div:nth-child(3)")[0].textContent;
                // let avg_gwei = dom.window.document.querySelector("#spanAvgPrice").textContent;
                // let avg_usd_time = dom.window.document.querySelector("#divAvgPrice > div:nth-child(3)").textContent;
                // let fast_gwei = dom.window.document.querySelector("#spanHighPrice").textContent;
                // let fast_usd_time = dom.window.document.querySelector("#divHighPrice > div:nth-child(3)").textContent;

                console.log(slow_gwei)
                console.log(avg_gwei)
                console.log(fast_gwei)
                //assemble the final message as message embed object
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Ethereum Gas Tracker`)
                    .addField("Slow:", `${slow_gwei} gwei${slow_usd_time.split("|")[0]}\n${slow_usd_time.split("|")[1]} \u200B\u200B`, true)
                    .addField("Average:", `${avg_gwei} gwei${avg_usd_time.split("|")[0]}\n${avg_usd_time.split("|")[1]} \u200B\u200B`, true)
                    .addField("Fast:", `${fast_gwei} gwei${fast_usd_time.split("|")[0]}\n${fast_usd_time.split("|")[1]} \u200B\u200B`, true)
                    .setColor('#1b51be')
                    .setThumbnail('https://kittyhelper.co/local/templates/main/images/ETHgas.png')
                    .setFooter('Powered by Etherscan', 'https://etherscan.io/images/brandassets/etherscan-logo-circle.png');
                // Send it

                try {
                    message.channel.send(embed);
                }
                catch (rej) {
                    message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                    console.log(chalk.red('Error sending eth gas response embed: ' + chalk.cyan(rej)));
                }
            });

    }

}

module.exports = GasCommand;