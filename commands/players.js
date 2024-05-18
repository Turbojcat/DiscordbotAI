const Gamedig = require('gamedig');
const { EmbedBuilder } = require('@discordjs/builders');


module.exports = {
    data: {
        name: 'players',
        description: 'Get the number of players on the Space Engineers server',
    },
    async execute(message) {
        try {
            console.log('Gamedig instance:', Gamedig);

            const serverOptions = {
                type: 'spaceengineers',
                host: '65.109.38.182', // Erstatt med din server-IP
                port: '27016' // Erstatt med din server-port
            };

            console.log('Server options:', serverOptions);

            const state = await gamedig.query(serverOptions);

            console.log('Server state:', state);

            const playerCount = state.players.length;
            const maxPlayers = state.maxplayers;

            console.log('Player count:', playerCount);
            console.log('Max players:', maxPlayers);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Space Engineers Server Status')
                .addFields(
                    { name: 'Players Online', value: `${playerCount}/${maxPlayers}`, inline: true },
                );

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching server status:', error);
            message.reply('An error occurred while fetching the server status.');
        }
    },
};
