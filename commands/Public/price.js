const { Command } = require('discord-akairo');
const fetch = require('node-fetch');


class PriceCommand extends Command {
    constructor() {
        super('price', {
            aliases: ['price', 'p'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the price and other details of a specific coin'
            },
            args: [
                {   id:'coin',
                    type:'string'
                    
                }
            ]
        });
    }

    async exec(message,args) {

        const getPrice = async () => {
            console.log(args.coin)
            const result = await fetch(`https://api.wazirx.com/api/v2/tickers/${args.coin}`)
            const json = await result.json()
            return json
          }
          let com = await getPrice()
          console.log(com)
          const stamp = new Date(com.at * 1000);
          const time = stamp.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
          console.log(time)
      
          message.reply(`
          
          Buy: ${com.ticker.buy}
          Sell: ${com.ticker.sell}
          Low: ${com.ticker.low}
          High: ${com.ticker.high}
          Last: ${com.ticker.last}
          Vol: ${com.ticker.vol}
          at: ${com.at}
          
          `)
    }
}

module.exports = PriceCommand;

