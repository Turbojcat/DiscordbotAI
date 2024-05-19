const Player = require('../../models/player/Player');
const { registerGameCommands } = require('../../commands/combat/CombatHandlers');
const { triggerRandomEvent } = require('../../events/randomEvents/RandomEvents');

function startGame(client) {
    console.log('Game is starting...');
    registerGameCommands(client);
    setInterval(triggerRandomEvent, 10000); // Trigger random events every 10 seconds
}

module.exports = { startGame };
