// commands/progression/skills.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'skills',
  description: 'View your character skills',
  execute(message) {
    const player = playerData[message.author.id];

    const skillsEmbed = createEmbed(
      'Character Skills',
      'Here are your current skill levels:'
    );

    for (const [skill, skillData] of Object.entries(player.skills)) {
      skillsEmbed.addField(
        skill.charAt(0).toUpperCase() + skill.slice(1),
        `Level: ${skillData.level}\nExperience: ${skillData.experience}`,
        true
      );
    }

    message.reply({ embeds: [skillsEmbed] });
  },
};
