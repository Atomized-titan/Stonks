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

client.on("message", message => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id)) {
        let ping = new Date().getTime() - message.createdTimestamp;
        if (Math.sign(ping) === -1) { ping = ping * -1; }
        message.channel.send('Whassssuuup?! ' + "<@!" + message.author.id + ">" + ' (`Ping:' + ping + " ms`)");
        message.channel.send('https://media.giphy.com/media/kigKjAJryWTZK/giphy.gif')
    };
    if (message.content === 'gm stonks' || message.content === 'Good morning stonks' || message.content === 'goodmorning stonks' || message.content === 'good morning stonks') {
        message.channel.send("Good Morning! " + "<@!" + message.author.id + ">")
    };
    if (message.content === 'f stonks' || message.content === 'stonks f' || message.content === 'F stonks' || message.content === 'stonks F') {
        // message.channel.send("F's in the chat boys " + "https://i.kym-cdn.com/photos/images/original/000/858/776/f2e.jpg_large")
        const respect = {
            title: "F's  in the chat boys",
            description: 'F to pay respect',
            image: {
              url: 'https://i.kym-cdn.com/photos/images/original/000/858/776/f2e.jpg_large',
            },
          };
          message.channel.send({ embed: respect });
    };
});

