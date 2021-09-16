const { Command } = require('discord-akairo');
const mongoCurrency = require('discord-mongo-currency');
const Discord = require('discord.js')

// const talkedRecently = new Set();

class DeleteCommand extends Command {
    constructor() {
        super('deleteData', {
            aliases: ['deleteData'],
            channel: 'guild',
            cooldown: 14400000,
            category: 'Economy',
            description: {
                content: "This command helps you wipe your data from our database. As we respect the user's privacy, we don't keep their data against their wishes."
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

            // const randomCoins = Math.floor(Math.random() * 49) + 1; // Random amount of coins.

            await mongoCurrency.deleteUser(message.member.id, message.guild.id);
            message.channel.send(`${message.author.username}, Your data has been successfully deleted from our database! \n You can use the beg command or recieve coins from admin to start a new account again!`)




           






    }
}

module.exports = DeleteCommand;

