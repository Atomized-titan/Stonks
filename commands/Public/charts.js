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

                },
                {
                    id: 'curr',
                },
                {
                    id: 'days'
                },
                {
                    id: 'theme'
                }
            ]
        });
    }

    async exec(message, args) {

        console.log(chalk.green("chart requested  " + chalk.yellow(message.author.username) + " in " + chalk.magentaBright(message.channel.guild.name)));
        console.log(args.coin)
        console.log(args.curr)



        const getPrice = async () => {

            if (args.coin && !args.curr) {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/${args.coin}/market_chart?vs_currency=usd&days=14&interval=daily`)
                const json = await result.json()
                return json

            }
            else if (args.coin && args.curr && !args.days) {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/${args.coin}/market_chart?vs_currency=${args.curr}&days=14&interval=daily`)
                const json = await result.json()
                return json
            }
            else if (args.coin && args.curr && args.days) {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/${args.coin}/market_chart?vs_currency=${args.curr}&days=${args.days}&interval=daily`)
                const json = await result.json()
                return json

            }
        }
        const chartData = await getPrice();
        console.log(chartData.prices[0][1])


        let arrDate = []
        let arrPrice = []
        const chart = new QuickChart();
        let j = chartData.prices.length;
        for (let i = 0; i < j; i++) {
            let timestamp = chartData.prices[i][0];
            let time = new Date(timestamp)
            let date = `${time.getMonth() + 1}-${time.getDate()}`
            arrDate.push(date)
            let price = chartData.prices[i][1]
            arrPrice.push(price)
        }
        chart.setConfig({
            type: 'line',
            data: {
                labels: arrDate,
                datasets:
                    [{
                        label: `Price (${args.curr ? args.curr : 'usd'}) last ${args.days || args.curr ? args.days : '14'} days `,
                        fontColor: 'white',
                        fill: false,
                        backgroundColor: 'transparent',
                        borderColor: '#EF8E19',
                        data: arrPrice
                    }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: '#aaa',
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                        },
                        // gridLines: {
                        //   color: '#aaa'
                        // }
                    }]
                }
            }
        });
        if (args.theme === "light" || args.coin === "light" || args.curr === "light") {
            chart.setConfig({
                type: 'line',
                data: {
                    labels: arrDate,
                    datasets:
                        [{
                            label: `Price (${args.curr ? args.curr : 'usd'}) last ${args.days || args.curr ? args.days : '14'} days `,
                            fontColor: 'white',
                            fill: false,
                            backgroundColor: 'transparent',
                            borderColor: '#EF8E19',
                            data: arrPrice
                        }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: '#fff',
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontColor: '#fff'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                                fontColor: '#fff'
                            },
                            // gridLines: {
                            //   color: '#aaa'
                            // }
                        }]
                    }
                }
            });
        }
        chart.setBackgroundColor('transparent')
        let url = chart.getUrl()

        // if (message.content) {
        //     const chartEmbed = {
        //         image: {
        //             url: chart.getUrl(),
        //         },
        //     };
        //     msg.channel.send({ embed: chartEmbed });
        // }
        var timestamp = Date.now()
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        if (message.content) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${args.coin.charAt(0).toUpperCase() + args.coin.slice(1)} Chart`)
                .setColor('#EF8E19')
                .setImage(url)
                .setFooter('Data fetched from CoinGecko.com • ' + `Today at ${strTime}`, 'https://i.imgur.com/EnWbbrN.png');

            //send it
            try {
                const msg = await message.channel.send('Fetching Chart...');
                msg.delete();
                message.channel.send({embed});

            }
            catch (rej) {
                msg.edit("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                console.log(chalk.red('Error sending chart response embed: ' + chalk.cyan(rej)));
            }
        }

    }

}

module.exports = ChartsCommand;