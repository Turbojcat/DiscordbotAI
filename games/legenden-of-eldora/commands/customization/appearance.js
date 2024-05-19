// commands/customization/appearance.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'appearance',
  description: 'Customize your character appearance',
  execute(message, args) {
    const player = playerData[message.author.id];
    const subcommand = args[0];

    if (!subcommand) {
      // Display current appearance settings
      const appearanceEmbed = createEmbed(
        'Character Appearance',
        'Here are your current appearance settings:',
        [
          { name: 'Hair Color', value: player.appearance.hairColor, inline: true },
          { name: 'Eye Color', value: player.appearance.eyeColor, inline: true },
          { name: 'Skin Tone', value: player.appearance.skinTone, inline: true },
          // Add more appearance settings as needed
        ]
      );

      message.reply({ embeds: [appearanceEmbed] });
    } else if (subcommand === 'hair') {
      // Change hair color
      const newHairColor = args[1];
      player.appearance.hairColor = newHairColor;
      message.reply(`Your hair color has been changed to ${newHairColor}.`);
    } else if (subcommand === 'eyes') {
      // Change eye color
      const newEyeColor = args[1];
      player.appearance.eyeColor = newEyeColor;
      message.reply(`Your eye color has been changed to ${newEyeColor}.`);
    } else if (subcommand === 'skin') {
      // Change skin tone
      const newSkinTone = args[1];
      player.appearance.skinTone = newSkinTone;
      message.reply(`Your skin tone has been changed to ${newSkinTone}.`);
    }
  },
};
