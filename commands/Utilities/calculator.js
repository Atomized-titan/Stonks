// const Discord = require('discord.js')
// const { Command } = require('discord-akairo');
// const disBut = require('discord-buttons')
// const math = require('mathjs')
// const chalk = require('chalk');



// class CalculatorCommand extends Command {
//     constructor() {
//         super('calculator', {
//             aliases: ['calculator', 'calc', 'calculate'],
//             channel: 'guild',
//             category: 'Utilities',
//             description: {
//                 content: 'A beautiful and button friendly calculator'
//             },
//             args: [
//                 {
//                     id: 'amount',

//                 },
//             ]
//         });
//     }

//     async exec(message, args) {
//         let button = new Array([], [], [], [], []);
//         let row = [];
//         let text = ["clear", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", ".", "0", "00", "="];
//         let current = 0;

//         for (let i = 0; i < text.length; i++) {
//             if (button[current].length === 4) current++;
//             button[current].push(createButton(text[i]));
//             if (i === text.length - 1) {
//                 for (let btn of button) row.push(addRow(btn));
//             }
//         }

//         //embed message

//         const embed = new Discord.MessageEmbed()
//             .setColor('BLUE')
//             .setAuthor(message.author.tag, message.author.displayAvatarURL())
//             .setDescription("```0```")

//         message.channel.send({
//             embed: embed,
//             components: row
//         }).then((msg) => {

//             let isWrong = false;
//             let time = 60000;
//             let value = "";
//             let embed1 = new Discord.MessageEmbed()
//                 .setAuthor(message.author.tag, message.author.displayAvatarURL())
//                 .setColor('BLUE')

//             function createCollector(val, result = false) {
//                 let filter = (buttons1) => buttons1.clicker.user.id === message.author.id && buttons1.id === "cal" + val;
//                 let collect = msg.createButtonController(filter, { time: 60000 }); // 1 minutes/60 seconds in ms

//                 collect.on("collect", async x => {
//                     x.defer();

//                     if (result === "new") value = "0"
//                     else if (isWrong) {
//                         value = val
//                         isWrong = false;
//                     }
//                     else if (value === "0") value = val;
//                     else if (result) {
//                         isWrong = true;
//                         value = mathEval(value);
//                     }
//                     else value += val

//                     embed1.setDescription("```" + value + "```")
//                     msg.edit({
//                         embed: embed1,
//                         components: row
//                     })
//                 })
//             }

//             for (let txt of text) {
//                 let result;
//                 if (txt === "clear") result = "new";
//                 else if (txt === "=") result = true
//                 else result = false;

//                 createCollector(txt, result)
//             }
//             setTimeout(() => {
//                 embed1.setDescription("Your time for using the calculator is RUNNING OUT!!")
//                 embed1.setColor("RED")
//                 msg.edit({
//                     embed: embed1,

//                 })
//             }, time)
//         })


//         //functions

//         function addRow(btns) {
//             let row1 = new disBut.MessageActionRow;
//             for (let btn of btns) {
//                 row1.addComponent(btn);
//                 return row1;
//             }
//         }
//         function createButton(label, style = "grey") {
//             if (label === 'clear') style = "red"
//             else if (label === '.') style = "grey"
//             else if (label === '=') style = "green"
//             else if (isNaN(label)) style = "blurple"

//             const btn = new disBut.MessageButton()
//                 .setLabel(label)
//                 .setStyle(style)
//                 .setID("cal" + label)
//             return btn;
//         }
//         function mathEval(input) {
//             try {
//                 let res = math.evaluate(input);
//                 return res;
//             } catch {
//                 return "Wrong Input!";
//             }
//         }

//     }
// }


// module.exports = CalculatorCommand;

