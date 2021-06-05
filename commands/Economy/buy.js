const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const db = require('quick.db')
const mongoCurrency = require('discord-mongo-currency');

class BuyCommand extends Command {
    constructor() {
        super('buy', {
            aliases: ['buy'],
            channel: 'guild',
            category: 'Economy',
            description: {
                content: 'Buy an item from the store'
            },
            args: [
                {
                    id: 'item'
                }
            ]

        });
    }

    async exec(message,args) {


        const member = message.author
        const memberId = member.id;
        let user = await mongoCurrency.findUser(memberId, message.guild.id);
        let amount = user.coinsInWallet

        let purchase = args.item;
        if (!purchase) return message.channel.send('Please provide an item to buy')
        let items = await db.fetch(message.author.id, { items: [] });

        if (purchase === 'car') {
            if (amount < 500) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            await mongoCurrency.deductCoins(memberId, message.guild.id, 500)
            db.push(message.author.id, "Car");
            message.channel.send('Successfully bought one car')
        }
        if (purchase === 'watch') {
            if (amount < 250) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            await mongoCurrency.deductCoins(memberId, message.guild.id, 250)
            db.push(message.author.id, "Watch");
            message.channel.send('Successfully bought one Watch')
        }
        if (purchase === 'sword') {
            if (amount < 300) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            await mongoCurrency.deductCoins(memberId, message.guild.id, 250)
            db.push(message.author.id, "Sword");
            message.channel.send('Successfully bought one Sword')
        }
        

    }
}

module.exports = BuyCommand;

