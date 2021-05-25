require('dotenv').config();
const { Command } = require('discord-akairo');
const Stonks = require('./core/client.js');
const client = new Stonks();


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

client.login(process.env.TOKEN);

client.on("guildCreate", guild => {
    const channels = guild.channels.cache.filter(channel => channel.type == "text");

    channels.first().send("Hello there, thanks for adding me! Get a list of commands and their usage with `.s help`.\n" +
        "Your default price command shortcut is `.s price/p`." +
        "\nIf you ever need help or have suggestions, please don't hesitate to join the support server and chat with us! " +
        " Use `.s help` for the link.").catch(e => console.log(e));
});