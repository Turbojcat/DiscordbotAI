// commands/progression/achievements.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const achievementData = require('../../data/achievements');

module.exports = {
  name: 'achievements',
  description: 'View your achievements',
  execute(message) {
    const player = playerData[message.author.id];

    if (player.achievements.length === 0) {
      const noAchievementsEmbed = createEmbed(
        'Achievements',
        'You have not earned any achievements yet.'
      );
      return message.reply({ embeds: [noAchievementsEmbed] });
    }

    const achievementsEmbed = createEmbed(
      'Achievements',
      'Here are the achievements you have earned:'
    );

    player.achievements.forEach(achievementId => {
      const achievement = achievementData[achievementId];
      achievementsEmbed.addField(
        achievement.name,
        achievement.description,
        true
      );
    });

    message.reply({ embeds: [achievementsEmbed] });
  },
};
