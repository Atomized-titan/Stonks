const { Listener } = require('discord-akairo');

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
        });
    }

    exec() {

        let i = 0;
        setInterval(() => this.client.user.setActivity(`.s help for help`, { type: 'PLAYING' }), 3000);
        console.log(`${this.client.user.tag} is now ready!`);
    }
};
