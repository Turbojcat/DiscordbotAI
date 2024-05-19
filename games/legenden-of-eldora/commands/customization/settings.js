// commands/customization/settings.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'settings',
  description: 'Manage your game settings',
  execute(message, args) {
    const player = playerData[message.author.id];
    const subcommand = args[0];

    if (!subcommand) {
      // Display current settings
      const settingsEmbed = createEmbed(
        'Game Settings',
        'Here are your current game settings:',
        [
          { name: 'Difficulty', value: player.settings.difficulty, inline: true },
          { name: 'Music Volume', value: player.settings.musicVolume.toString(), inline: true },
          { name: 'Sound Effects Volume', value: player.settings.sfxVolume.toString(), inline: true },
          // Add more settings as needed
        ]
      );

      message.reply({ embeds: [settingsEmbed] });
    } else if (subcommand === 'difficulty') {
      // Change difficulty
      const newDifficulty = args[1];
      player.settings.difficulty = newDifficulty;
      message.reply(`Your game difficulty has been changed to ${newDifficulty}.`);
    } else if (subcommand === 'music') {
      // Change music volume
      const newMusicVolume = parseInt(args[1]);
      player.settings.musicVolume = newMusicVolume;
      message.reply(`Your music volume has been changed to ${newMusicVolume}.`);
    } else if (subcommand === 'sfx') {
      // Change sound effects volume
      const newSfxVolume = parseInt(args[1]);
      player.settings.sfxVolume = newSfxVolume;
      message.reply(`Your sound effects volume has been changed to ${newSfxVolume}.`);
    }
  },
};
