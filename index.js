require('dotenv').config();
const { Command } = require('discord-akairo');
const Stonks = require('./core/client.js');
const client = new Stonks();


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));


// async exec(message) {
//     if (message.guild) {
//         console.log(chalk.yellowBright("NEW SERVER ADDED TO THE FAMILY!! Welcome: " + chalk.cyan(message.guild.name) + " with " + chalk.cyan(message.guild.memberCount) + " users!"));
//         if (message.guild.systemChannel) {
//             message.guild.systemChannel.send("Hello there, thanks for adding me! Get a list of commands and their usage with `.s help`.\n" +
//                 "Your default price command shortcut is `.s price/p`." +
//                 "\nIf you ever need help or have suggestions, please don't hesitate to join the support server and chat with us! " +
//                 " Use `.s help` for the link.").catch(function (rej) {
//                     console.log(chalk.red("Failed to send introduction message, missing message send permissions"));
//                     // const failGC = true;
//                 });
//         }
//         else {
//             console.log(chalk.red(chalk.cyan(guild.name) + " does not have a valid system channel." + chalk.yellow(" No intro will be sent!")));
//             failGC = true;
//         }
//     }

// }


client.login(process.env.TOKEN);

client.on("guildCreate", guild => {
    const channels = guild.channels.cache.filter(channel => channel.type == "text");

    channels.first().send("Hello there, thanks for adding me! Get a list of commands and their usage with `.s help`.\n" +
        "Your default price command shortcut is `.s price/p`." +
        "\nIf you ever need help or have suggestions, please don't hesitate to join the support server and chat with us! " +
        " Use `.s help` for the link.").catch(e => console.log(e));
});