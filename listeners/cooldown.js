const { Listener } = require('discord-akairo');


module.exports = class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown',
        });
    }

    exec(message,command,remaining) {

        function msToTime(duration) {
            var milliseconds = Math.floor((duration % 1000) / 100),
              seconds = Math.floor((duration / 1000) % 60),
              minutes = Math.floor((duration / (1000 * 60)) % 60),
              hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
          
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
          
            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
          }
          let time = msToTime(remaining)

        message.channel.send(`${message.author.username}, You cant use the command ${command.id} for \`${time}\`!`);
      
    }
};
