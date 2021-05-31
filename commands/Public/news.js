const Discord = require('discord.js')
const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const chalk = require('chalk');
const pagination = require('discord.js-pagination')




class NewsCommand extends Command {
    constructor() {
        super('news', {
            aliases: ['news', 'crypto'],
            channel: 'guild',
            category: 'Public Commands',
            description: {
                content: "Get latest top news from last week till now on a given topic",
                usage: ", .s news <topic>"
            },
            args: [
                {
                    id: 'search',
                }
            ]
        });
    }

    async exec(message,args) {

        
            const getNews = async () => {
                if(!args.search){
                    const result = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=Crypto&lang=en`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-key": "ddc3b4a5b1mshdbfa35734a7c2c3p1b24f1jsn71cff97ae3f2",
                            "x-rapidapi-host": "free-news.p.rapidapi.com"
                        }
                    })
                    const json = await result.json()
                    return json
                }
                else{
                    const result = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=${args.search}&lang=en`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-key": "ddc3b4a5b1mshdbfa35734a7c2c3p1b24f1jsn71cff97ae3f2",
                            "x-rapidapi-host": "free-news.p.rapidapi.com"
                        }
                    })
                    const json = await result.json()
                    return json
                }
               
            }
        let com = await getNews()
        console.log(com.articles[0].title)

        var timestamp = Date.now()
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        let j = com.articles.length;
        console.log(j);

        const pages = [];
        
        
        for (let i = 0; i < j; i++) {

            let page = new Discord.MessageEmbed()
            .setAuthor(`Stonks News`,'https://i.imgur.com/t6wfARU.png',`https://discord.gg/5YRr6qZwEj`)
            .setTitle(com.articles[i].title).setURL(com.articles[i].link)
            .setDescription(com.articles[i].summary)
            .addField('\u200b',`Author: ${com.articles[i].author}`)
            .addField('\u200b',`Published: ${com.articles[i].published_date}`)
            .setColor('#1b51be')
            .setImage(com.articles[i].media)
            .setFooter(`• ${com.articles[i].clean_url} • ${com.articles[i].topic} `  + `• Today at ${strTime}`);
            pages.push(page)
            
        }

        const emoji = ["⏪", "⏩"]
        const timeout = '300000'
        
        

        try {
            // message.channel.send({ embed });
            pagination(message, pages, emoji, timeout)
        }
        catch (rej) {
            message.channel.send("Sorry, I was unable to process this command. Make sure that I have full send permissions for embeds and messages and then try again!");
            console.log(chalk.red('Error sending news response embed: ' + chalk.cyan(rej)));
        }
    }

}

module.exports = NewsCommand;