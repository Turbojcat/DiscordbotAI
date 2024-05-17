module.exports = {
    data: {
        name: 'ping',
        description: 'Pings the bot',
    },
    execute(message, args) {
        console.log('Executing ping command');
        message.reply('Pong!');
    },
};