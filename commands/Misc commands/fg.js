const { Command } = require('discord-akairo');
const request = require('request');
const Discord = require('discord.js')
const chalk   = require('chalk');


class FgCommand extends Command {
    constructor() {
        super('fg', {
            aliases: ['fg', 'feargreed', 'fear/greed'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: 'Get the current Bitcoin fear and greed index value'
            }
        });
    }

    async exec(message) {

        console.log(chalk.green("Fear/greed index requested by " + chalk.yellow(message.author.username)));
        request('https://api.alternative.me/fng/?limit=1&format=json', function (error, response, body) {
            let color = '#ea0215';
            //parse response data
            let resJSON = JSON.parse(body);
            let tier = resJSON.data[0].value_classification;
            //calculate embed color based on value
            if (resJSON.data[0].value >= 40 && resJSON.data[0].value <= 60) { color = '#f2f207'; }
            else if (resJSON.data[0].value > 60) { color = '#0eed11'; }
            else if (resJSON.data[0].value < 25) { tier = "Despair"; }

            //calculate next update countdown
            let d = resJSON.data[0].time_until_update;
            let h = Math.floor(d / 3600);
            let m = Math.floor(d % 3600 / 60);
            //create embed and insert data 
            let embed = new Discord.MessageEmbed()
                .setAuthor("Fear/Greed Index", 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png')
                .addField("Current Value:", resJSON.data[0].value + " (" + tier + ")")
                .setColor(color)
                .setFooter("Next update: " + h + " hrs, " + m + " mins");

            message.channel.send({ embed }).catch(function (rej) {
                message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
                console.log(chalk.red('Error sending fear/greed index! : ' + chalk.cyan(rej)));
            });
        });

    }
}

module.exports = FgCommand;

