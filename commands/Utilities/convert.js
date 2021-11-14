const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const chalk = require('chalk');



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

        console.log(chalk.green("Currency conversion was requested by " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        // ---------------------------------------Number with commas function-------------------------------------------

        function numberWithCommas(x) {
            x = x.toString();
            var pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(x))
                x = x.replace(pattern, "$1,$2");
            return x;
        }

        let coin1 = args.coin1.toUpperCase()
        let coin2 = `${args.coin2.toUpperCase()}`
        let amount = args.amount.replace(/,/g, '');
        const getConvert = async () => {

            const result = await fetch(`https://exchangerate-api.p.rapidapi.com/rapid/latest/${coin1}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "ddc3b4a5b1mshdbfa35734a7c2c3p1b24f1jsn71cff97ae3f2",
                    "x-rapidapi-host": "exchangerate-api.p.rapidapi.com"
                }
            })
            const json = await result.json()
            return json

        }
        const com = await getConvert()
        let convertedValue = amount * com.rates[coin2];
        message.channel.send(`\`${amount} ${coin1} \` ➪ \` ${numberWithCommas(convertedValue.toFixed(2))} ${coin2}\``)
    }
}

module.exports = ConvertCommand;

