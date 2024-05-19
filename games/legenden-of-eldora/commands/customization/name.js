// commands/customization/name.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'name',
  description: 'Change your character name',
  execute(message, args) {
    const player = playerData[message.author.id];
    const newName = args.join(' ');

    if (!newName) {
      return message.reply('You must provide a new name for your character!');
    }

    // Implement name change logic
    changeCharacterName(player, newName);

    const nameChangeEmbed = createEmbed(
      'Name Changed',
      `Your character name has been changed to ${newName}.`
    );
    message.reply({ embeds: [nameChangeEmbed] });
  },
};

function changeCharacterName(player, newName) {
  // Implement name change logic
  player.name = newName;
}
