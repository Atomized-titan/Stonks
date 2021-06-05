const { Command } = require('discord-akairo');
const mongoCurrency = require('discord-mongo-currency');
const Discord = require('discord.js')

// const talkedRecently = new Set();

class BegCommand extends Command {
    constructor() {
        super('beg', {
            aliases: ['beg', 'bg'],
            channel: 'guild',
            cooldown: 14400000,
            category: 'Economy',
            description: {
                content: 'User can beg for random amount of coins from 1 - 50'
            },
            args: [{

                id: 'member'

            }
            ]

        });
    }

    async exec(message) {

        

        // let msg = message;

        // if (talkedRecently.has(msg.author.id)) {
        //     msg.channel.send("Wait 4hrs before getting typing this again. - " + msg.author);
        // } else {

            // the user can type the command ... your command code goes here :)

            // Adds the user to the set so that they can't talk for a minute
            const mongoCurrency = require('discord-mongo-currency');

            const randomCoins = Math.floor(Math.random() * 49) + 1; // Random amount of coins.

            await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomCoins);
            message.channel.send(`${message.author.username}, you begged and received \`${randomCoins}\` Stonkscoins`)




            // talkedRecently.add(msg.author.id);
            // setTimeout(() => {
            //     // Removes the user from the set after a minute
            //     talkedRecently.delete(msg.author.id);
            // }, 14400000);
        // }






    }
}

module.exports = BegCommand;

