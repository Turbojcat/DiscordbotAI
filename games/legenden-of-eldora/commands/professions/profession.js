// commands/professions/profession.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const professionData = require('../../data/professions');

module.exports = {
  name: 'profession',
  description: 'Manage your professions',
  execute(message, args) {
    const player = playerData[message.author.id];
    const subcommand = args[0];

    if (!subcommand) {
      // Display current professions
      const professionEmbed = createEmbed(
        'Professions',
        'Here are your current professions:'
      );

      player.professions.forEach(profession => {
        const professionInfo = professionData[profession];
        professionEmbed.addField(
          professionInfo.name,
          `Level: ${professionInfo.level}\nExperience: ${professionInfo.experience}`,
          true
        );
      });

      message.reply({ embeds: [professionEmbed] });
    } else if (subcommand === 'learn') {
      // Learn a new profession
      const professionName = args[1];
      learnProfession(player, professionName);
    } else if (subcommand === 'practice') {
      // Practice a profession
      const professionName = args[1];
      practiceProfession(player, professionName);
    }
  },
};

function learnProfession(player, professionName) {
  // Implement profession learning logic
}

function practiceProfession(player, professionName) {
  // Implement profession practicing logic
}
