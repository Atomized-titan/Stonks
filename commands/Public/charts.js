const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const chalk = require('chalk');
const QuickChart = require('quickchart-js');



class ChartsCommand extends Command {
    constructor() {
        super('chart', {
            aliases: ['chart', 'sc'],
            channel: 'guild',
            category: 'Public Commands',
            prefix: ['.', '.s'],
            description: {
                content: 'Gives the Chart representation of the required coin',
                usage: ', .sc <coin>'
            },
            args: [
                {
                    id: 'coin',
                }
            ]
        });
    }

    async exec(message, args) {

        console.log(chalk.green("chart requested  " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        console.log(args.coin)

        const chart = new QuickChart();
        chart.setConfig({
            type: 'bar',
            data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
        });
        if (message.content) {
            const url = await chart.getShortUrl();
            message.channel.send(`Here's the chart you requested: ${url}`);
        }
    }

}

module.exports = ChartsCommand;