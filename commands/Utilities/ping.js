const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'pong'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the ping of the bot.'
            }
        });
    }

    async exec(message) {

        const msg = await message.channel.send('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['Is this really my ping?', 'Is that okay? I can\'t look!', 'I hope it isn\'t bad!'];
        const reponse = choices[Math.floor(Math.random() * choices.length)];

        msg.edit(`${reponse} - **Bot Latency**: \`${latency}ms\`, **API Latency**: \`${Math.round(this.client.ws.ping)}ms\``)

    }
}

module.exports = PingCommand;

