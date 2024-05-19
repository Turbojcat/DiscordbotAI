// commands/housing/farm.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const farmData = require('../../data/farms');

module.exports = {
  name: 'farm',
  description: 'Manage your farm',
  execute(message, args) {
    const player = playerData[message.author.id];
    const subcommand = args[0];

    if (!subcommand) {
      // Display farm information
      const farm = player.farm;

      if (!farm) {
        const noFarmEmbed = createEmbed(
          'Farm',
          'You do not own a farm.'
        );
        return message.reply({ embeds: [noFarmEmbed] });
      }

      const farmInfo = farmData[farm];
      const farmEmbed = createEmbed(
        'Farm Information',
        `Here are the details of your farm:`,
        [
          { name: 'Name', value: farmInfo.name, inline: true },
          { name: 'Size', value: farmInfo.size, inline: true },
          { name: 'Crops', value: farmInfo.crops.join(', '), inline: false },
          // Add more farm details as needed
        ]
      );

      message.reply({ embeds: [farmEmbed] });
    } else if (subcommand === 'buy') {
      // Buy a new farm
      buyFarm(player, args[1]);
    } else if (subcommand === 'upgrade') {
      // Upgrade the current farm
      upgradeFarm(player);
    } else if (subcommand === 'plant') {
      // Plant a new crop on the farm
      plantCrop(player, args[1]);
    }
  },
};

function buyFarm(player, farmName) {
  // Implement farm buying logic
}

function upgradeFarm(player) {
  // Implement farm upgrading logic
}

function plantCrop(player, cropName) {
  // Implement crop planting logic
}
