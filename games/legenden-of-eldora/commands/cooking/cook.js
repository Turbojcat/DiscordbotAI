// commands/cooking/cook.js
const { calculateExperienceNeeded } = require('../../utils/gameUtils');
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const { SKILL_LEVELS } = require('../../utils/constants');

module.exports = {
  name: 'cook',
  description: 'Cook a dish',
  execute(message, args) {
    const player = playerData[message.author.id];
    const dish = args[0];

    if (!dish) {
      return message.reply('You must specify a dish to cook!');
    }

    const cookingLevel = player.skills.cooking.level;
    const requiredLevel = SKILL_LEVELS[dish];

    if (cookingLevel < requiredLevel) {
      return message.reply(`You need to be at cooking level ${requiredLevel} to cook ${dish}!`);
    }

    // Implement cooking logic
    player.skills.cooking.experience += calculateExperienceNeeded(cookingLevel);

    if (player.skills.cooking.experience >= SKILL_LEVELS[cookingLevel + 1].totalExperience) {
      player.skills.cooking.level++;
      const levelUpEmbed = createEmbed(
        'Level Up!',
        `Congratulations! You have reached cooking level ${player.skills.cooking.level}.`
      );
      message.reply({ embeds: [levelUpEmbed] });
    }

    const experienceGainedEmbed = createEmbed(
      'Cooking Experience Gained',
      `You cooked ${dish} and gained ${player.skills.cooking.experience} cooking experience.`
    );
    message.reply({ embeds: [experienceGainedEmbed] });
  },
};
