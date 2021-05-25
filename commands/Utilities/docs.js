const { Command } = require('discord-akairo');

class DocsCommand extends Command {
    constructor() {
        super('docs', {
            aliases: ['docs', 'doc'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the link to the fancy help document that lists every command and how to use them'
            },
            args: [
                {
                    id: 'code'
                }
            ]
        });
    }

    async exec(message, code) {
        code = code || "none";
        let fail = false;
        const link = "https://github.com/Atomized-titan/Stonks/blob/master/common/commands.md";
        message.author.send("Hi there! Here's a link to the fancy help document that lists every command and how to use them: \n" + link)
            .catch(function (rej) {
                console.log(chalk.yellow("Failed to send help text to " + message.author.username + " via DM, sent link in server instead."));
                message.reply("I tried to DM you the commands but you don't allow DMs. Hey, it's cool, I'll just leave the link for you here instead: \n" + link)
                    .then(function () {
                        fail = true;
                    });
            });


        // if (code === 'ask') {
        //     message.author.send("Hi there! Here's a link to the fancy help document that lists every command and how to use them: \n" + link)
        //         .catch(function (rej) {
        //             console.log(chalk.yellow("Failed to send help text to " + message.author.username + " via DM, sent link in server instead."));
        //             message.reply("I tried to DM you the commands but you don't allow DMs. Hey, it's cool, I'll just leave the link for you here instead: \n" + link)
        //                 .then(function () {
        //                     fail = true;
        //                 });
        //         });
        //     setTimeout(function () {
        //         if (!fail) {
        //             message.reply("I sent you a DM with a link to my commands!").catch(function (rej) {
        //                 console.log(chalk.red("Failed to reply to tbhelp message in chat!"));
        //                 fail = true;
        //             });
        //         }
        //     }, 1000);
        //     setTimeout(function () {
        //         if (!fail) {
        //             console.log(chalk.green("Successfully sent help message to: " + chalk.yellow(message.author.username)));
        //         }
        //     }, 1800);
        // } else {
        //     message.channel.send("Command not recognized. Use `.s help` to see the commands and their usage. \n" +
        //         "Keep in mind that commands follow this format: `.s <command> <parameter(s)>`");

        // }

    }

}

module.exports = DocsCommand;

