const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const chalk = require('chalk');
var S = require('string');




class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info', 'i'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'This provides the description/purpose of a specific coin'
            },
            args: [
                {
                    id: 'coin'

                }
            ]
        });
    }

    async exec(message, args) {

        if (args.coin === null || args.coin === undefined) {
            message.channel.send("Command not recognized. Use `.s help` to see the commands and their usage. \n" +
                "Keep in mind that commands follow this format: `.s <command> <parameter(s)>` \n"
                + "In this case enter the full name of the coin you want the information for as a parameter \nFor Example: \`.s info bitcoin\` "
            );
        }
        else {
            console.log(chalk.green("Coin description requested by " + chalk.yellow(message.author.username) + " for " + chalk.cyan(args.coin)));
            const getInfo = async () => {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/${args.coin}`)
                const json = await result.json()
                return json
            }

            const com = await getInfo()


            // let stringResponse;
            // // Checking to make sure that there even is a description for this coin
            // if (com.description) {
            //     stringResponse = com.description.en;
            //     const descDOM = new JSDOM(stringResponse);
            //     let convertedLinks = [];


            //     // Extract all of the html links, convert them to discord embed links, and then put them into an array
            //     let elements = descDOM.window.document.getElementsByTagName('a');
            //     for (let i = 0; i < elements.length; i++) {
            //         let element = elements[i];
            //         let url = element.href;
            //         let hyperlinkText = element.text;
            //         var discordHyperlink = `[${hyperlinkText}](${url})`;
            //         convertedLinks.push(discordHyperlink);
            //     }
            //     console.log(discordHyperlink)

            //     // Replace each html link in the description string its the corresponding converted link we created earlier
            //     for (let i = 0; i < convertedLinks.length; i++) {
            //         let locatedString = S(stringResponse).between("<a href=\"", "</a>").s;
            //         let lookupString = `<a href=\"${locatedString}</a>`;
            //         let stringResponse = stringResponse.replace(lookupString, convertedLinks[i]);
            //     }

            //     // Clean up the newline formatting
            //     // stringResponse = S(stringResponse).replaceAll('\r\n\r\n', '\n\n').s;
            //     // stringResponse = S(stringResponse).replaceAll('\r\n\r', '\n\n').s;
            //     // stringResponse = S(stringResponse).replaceAll('\r\n', '\n').s;
            //     // stringResponse = S(stringResponse).replaceAll('\n\r', '\n').s;
            //     // stringResponse = S(stringResponse).replaceAll('\n\r\n', '\n\n').s;
            //     // stringResponse = S(stringResponse).replaceAll('\n\r\n\r', '\n\n').s;
            // }
            // console.log(stringResponse)



            const result = com.description.en;
            const image = com.image.large;
            console.log(result.length)
            if (result.length > 2000) {
                const diff = result.length - 1014;
                console.log(diff)
                const info = result.slice(0, result.length - diff);
                // console.log(info)
                //     message.reply(`

                //    info: ${info}

                //   `)
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${args.coin.charAt(0).toUpperCase() + args.coin.slice(1)}`)
                    .addField("Info", `${info} \n \u200B\u200B`, true)
                    .setColor('#1b51be')
                    .setThumbnail(`${image}`)
                    .setFooter('Powered by CoinGecko', 'https://i.imgur.com/EnWbbrN.png');

                try {
                    message.channel.send({ embed });
                }
                catch (rej) {
                    message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                    console.log(chalk.red('Error sending eth gas response embed: ' + chalk.cyan(rej)));
                }
            }
            else {
                const diff = result.length - 1019;
                console.log(diff)
                const info = result.slice(0, result.length - diff);
                // console.log(info)
                //     message.reply(`

                //    info: ${info}

                //   `)
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${args.coin.charAt(0).toUpperCase() + args.coin.slice(1)}`)
                    .addField("Info", `${info} \n \u200B\u200B`, true)
                    .setColor('#1b51be')
                    .setThumbnail(`${image}`)
                    .setFooter('Powered by CoinGecko', 'https://i.imgur.com/EnWbbrN.png');

                try {
                    message.channel.send({ embed });
                }
                catch (rej) {
                    message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                    console.log(chalk.red('Error sending eth gas response embed: ' + chalk.cyan(rej)));
                }

            }

        }

    }

}

module.exports = InfoCommand;

