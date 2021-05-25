const { Command } = require('discord-akairo');
const fetch = require('node-fetch');





class McCommand extends Command {
    constructor() {
        super('marketcap', {
            aliases: ['marketcap', 'mc'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the Market Cap of a specific coin'
            },
            args: [
                {
                    id: 'coin'

                }
            ]
        });
    }

    async exec(message) {

        let cur = '';
        cur = message.content.toLowerCase().replace('.s', '').replace('mc', '').trimStart().trimEnd();;
        if (cur === 'hammer') {
            message.channel.send('https://youtu.be/otCpCn0l4Wo?t=14'); return;
        }
        const getMC = async () => {

            const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false}`)
            const json = await result.json()
            return json
        }

        let ticker = await getMC();
        let j = ticker.length;

        for (let i = 0; i < j; i++) {
            if (ticker[i].symbol.toUpperCase() === cur || ticker[i].name.toUpperCase() === cur || ticker[i].market_cap_rank + '' === cur) {
                let name = ticker[i].name;
                let slug = ticker[i].id;
                console.log(name)
                console.log(slug)


            }

        }

    }
}



module.exports = McCommand;

