const { Command } = require('discord-akairo');
const chalk = require('chalk');
const Discord = require('discord.js')



class StatsCommand extends Command {
    constructor() {
        super('stat', {
            aliases: ['stat', 'stats'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the detailed stats of the bot.'
            }
        });
    }

    async exec(message) {

        let messageCount = 0;
        let referenceTime = Date.now();

        function numberWithCommas(x) {
            x = x.toString();
            var pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(x))
                x = x.replace(pattern, "$1,$2");
            return x;
        }
        // keep track of messages
        messageCount = (messageCount + 1) % 10000;
        if (messageCount === 0) referenceTime = Date.now();
        //  if(messageCount % 100 === 0){
        //  console.log(chalk.green("messages so far: " + chalk.cyan(messageCount)));}

        console.log(chalk.green('Session stats requested by: ' + chalk.yellow(message.author.username)));
        let users = (message.client.guilds.cache.reduce(function (sum, guild) { return sum + guild.memberCount; }, 0));
        users = numberWithCommas(users);
        const guilds = numberWithCommas(message.client.guilds.cache.size);
        const msgpersec = Math.trunc(messageCount * 1000 * 60 / (Date.now() - referenceTime));
        //const topCrypto   = coinArrayMax(requestCounter);
        //const popCrypto   = coinArrayMax(mentionCounter);
        const msgh = ("Serving `" + users + "` users from `" + guilds + "` servers.\n" +
            "⇒ Current uptime: `" + Math.trunc(message.client.uptime / (3600000)) + "hr`.\n" +
            "⇒ Average messages per minute: `" + msgpersec + "`.\n" +
            // + (topCrypto[1] > 0 ? "⇒ Top requested crypto: `" + topCrypto[0] + "` with `" + topCrypto[1] + "%` dominance.\n" : "")
            // + (popCrypto[1] > 0 ? "⇒ Top mentioned crypto: `" + popCrypto[0] + "` with `" + popCrypto[1] + "%` dominance.\n" : "")
            "⇒ Join the support server! (https://discord.gg/MmApFPjb7K)\n" +
            "`⇒ ETH donations appreciated at: 0x161e9a11de8262f4fba8cb1faf479910d5abf3fd`");

        let embed = new Discord.MessageEmbed()
            .addField("Stonks Stats", msgh)
            .setColor('BLUE')
            .setThumbnail('https://i.imgur.com/t6wfARU.png')
            .setFooter('Part of Stonks', 'https://i.redd.it/jwg3gw87s6b41.png');
        message.channel.send({ embed });

    }
}

module.exports = StatsCommand;

