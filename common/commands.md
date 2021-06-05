# Stonks &nbsp;

========

#### Welcome to the official commands list! Here you can find all available commands and details on how to use them. <br>

### NOTE: If you didn't see an introduction message when the bot joined or the bot does not respond to you, it is missing permissions! 

To resolve permissions issues, kick the bot and add it back using [THIS INVITE LINK](https://discord.com/api/oauth2/authorize?client_id=844842149006802944&permissions=4161141840&redirect_uri=http%3A%2F%2Flocalhost%3A5000&scope=bot) and keep the requested permissions checked! These permissions are **REQUIRED** for the bot to work correctly!! If you need help, join the support server using the link at the bottom of this page.

#### All commands follow this general structure unless noted otherwise: `.s <command> <parameters>`

<br>

## Simple WazirX Price Checks:
##### Usage: `.s p/price <coin><currency>` (Currency: INR or USDT)
This is the most commonly used command in the bot. It's a super simple and fast way to check prices of coins using WazirX. The prices available for this command are updated every 2 minutes and supports all (over 6000 and counting) coins listed on WazirX. You can call the price for just one coin. You must provide the coin TICKER symbol when using this command. For example, Ethereum has the ticker symbol ETH, and Bitcoin has the ticker symbol BTC, and so on..<br>

Examples:
+ `.s p ethinr` : Price of Ethereum in INR
+ `.s price btcusdt` : Price of Bitcoin in USDT<br>
Simple enough right?

#### Multi coin input support coming soon

## CoinGecko coin Description:
#### Usage: `.s info/i <coin>` (any coin)
This is the command to get all the history, description/info, purpose of a specific coin with its symbol.
In this case you must provide the full name of the coin you are searching for. For example, Ethereum has the ticker name ethereum, and Bitcoin has the ticker name bitcoin, and so on..<br>

Examples:
+ `.s i ethereum` : Price of Ethereum in INR
+ `.s info bitcoin` : Price of Bitcoin in USDT<br>

Super cool!

## Market cap of a specific coin:
#### Usage: `.s mc <coin>` (any coin)
This provides the Market cap, supply, and volume data for the provided coin.
In this case you can provide the full name, ticker symbol or the rank of the coin you are searching for. For example, Ethereum has the ticker name ethereum, and Bitcoin has the ticker symbol btc, a rank, and so on..<br>

Examples:
+ `.s mc ethereum` : Market Cap of Ethereum in USDT
+ `.s mc xrp` : Market Cap of XRP in USDT<br>
+ `.s mc 5` : Market Cap of the 5th ranking coin in USDT<br>

Now you have a lot of data on a single coin!

## CoinGecko Charts:
### Prefix: `.sc`
#### Usage: `.sc <coin> <vs_currency> <days> <other options>`
Stonks supports grabbing chart values from CoinGecko, turning them into charts using quickchart.io and sending them as an image right in the channel where you called for them.
This command is very versatile as its input is basically only limited by whatever CoinGecko can take. You can put any cryptocurrency listed on CoinGecko.
<br><br>Providing vs_currency, days and other options are all completely optional and you can call this command with just a coin and it will default to the deafult options (such as vs_currency = USD, days = 14, interval = daily and theme = Dark). <br><br>The following are the options currently tested to be supported by this command (with more on the way):
+ **coin**: Whatever coinss and tickers that CoinGecko supports. **NOTE:** use a full name rather than just the symbol. Like "bitcoin" instead of just  "btc"
+ **vs_currency**: The target currency of market data (usd, eur, jpy, inr, gbp, aud, cad etc.)
+ **days**: Data up to number of days ago. Basically the data range. (eg.1,14,30)
+ **interval**: Data interval. Possible value: daily
+ **other options**: theme(Dark by default. Change it to 'light' if you want to change the label color to white)

Need a visual example? Check out the visual demo down below to see the charts command in action.
<br>

### ETH Gas prices:
#### Usage: `.s gas`
Shows the current Ethereum gas prices required to send a transaction (shows the current slow price, standard price, and fast price)

### Bitcoin Fear/Greed Index value:
#### Usage: `.s fg`
Get the current Bitcoin fear/greed index value

### Economy system commands:
### Usage: `.s <command>`

+ `.s give <@someone> <amount>`: Gives an amount of Stonkcoins  to a user (Only usable by members with the ADMINISTRATOR permission)
+ `.s fine <@someone> <amount>`: Fines or deducts an amount of Stonkcoins from a user (Only usable by members with the ADMINISTRATOR permission)
+ `.s beg`: User can beg for random amount of Stonkcoins from 1 - 50 (Can be done every 4 hours)
+ `.s balance/bal`: This provides your balance of Stonkcoins.
+ `.s leaderboard/ldr <@someone> <@someone> <@>.....`: Shows a leaderboard of how much money all the mentioned members have in a ranking list


## Other important commands:
#### Usage: `.s <command>`

+ `.s trending`: Top-7 trending coins on CoinGecko as searched by users in the last 24 hours
+ `.s mc <coin>`: Market cap, supply, and volume data for the provided coin. (Search by name, symbol or rank!)
+ `.s cv <amount> <coin1> <coin2>`: Simple currency conversion of X amount of coin1 to coin2
+ `.s id`: Get your unique Discord ID number DM'd to you
+ `.s unix <timstamp>`: Convert UNIX timestamp to date.
+ `.s ego`: Boosts your ego
+ `.s ping`: it will reply to you and show the current response ping.
+ `.s docs`: DM's the command list to the caller
+ `.s invite`: Get a pre-permissioned link to add Stonks to your own server!
+ `.s prefix`: Customize the prefix for your server (only Admins)
+ `.s key`: Generates useless random 16 digit alpha-numeric key.
+ `.s help`: Lists out all commands
+ `.s help <command>`: Help on a specific command
+ `.s news` / `.s crypto`: News on crypto from last week with complete page system
+ `.s news <topic>`: News on any given topic from last week with complete page system
+ `@Stonks`: Mention the bot to get the ping
<br>

## More of a visual learner? Check out these demonstration screenshots:

<blockquote class="imgur-embed-pub" lang="en" data-id="a/HEwdTsn"><a href="//imgur.com/a/HEwdTsn">Stonks Demo</a></blockquote>
<br><br>

---

This document is subject to change as development continues. <br>
Be sure to join the support server for help with using the bot or understanding these commands. You can get help, report problems, and make suggestions for future updates and features!<br>
Join the support server here: [discordapp.com/Stonks](https://discord.gg/2CFWHZGcAz)

---

ETH donations to: `0x161e9a11de8262f4fba8cb1faf479910d5abf3fd` are greatly appreciated and help support future development!
<br><br>

[![Discord Bots](https://discordbotslist.co/api/embed/844842149006802944)](https://discordbotslist.co/bots/844842149006802944)




