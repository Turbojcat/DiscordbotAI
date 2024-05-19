const gamedig = require('gamedig');
const Gamedig = gamedig.Gamedig;
const { EmbedBuilder } = require('@discordjs/builders');
const util = require('util');

module.exports = {
    data: {
        name: 'players',
        description: 'Get the number of players on the Space Engineers server',
    },
    execute: async (message) => {
        try {
            const serverOptions = {
                type: 'spaceengineers',
                host: '65.109.38.182', // Replace with your server IP
                port: '27016' // Replace with your server port
            };

            console.log('Server options:', serverOptions);

            const gamedigInstance = new Gamedig();
            const queryPromise = util.promisify(gamedigInstance.query).bind(gamedigInstance);
            const state = await queryPromise(serverOptions);

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
