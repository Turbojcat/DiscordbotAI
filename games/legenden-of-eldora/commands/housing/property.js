// commands/housing/property.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const propertyData = require('../../data/properties');

module.exports = {
  name: 'property',
  description: 'Manage your properties',
  execute(message, args) {
    const player = playerData[message.author.id];
    const subcommand = args[0];

    if (!subcommand) {
      // Display owned properties
      if (player.properties.length === 0) {
        const noPropertiesEmbed = createEmbed(
          'Properties',
          'You do not own any properties.'
        );
        return message.reply({ embeds: [noPropertiesEmbed] });
      }

      const propertiesEmbed = createEmbed(
        'Owned Properties',
        'Here are the properties you own:'
      );

      player.properties.forEach(propertyId => {
        const property = propertyData[propertyId];
        propertiesEmbed.addField(
          property.name,
          `Type: ${property.type}\nValue: ${property.value}`,
          true
        );
      });

      message.reply({ embeds: [propertiesEmbed] });
    } else if (subcommand === 'buy') {
      // Buy a new property
      buyProperty(player, args[1]);
    } else if (subcommand === 'sell') {
      // Sell a property
      sellProperty(player, args[1]);
    }
  },
};

function buyProperty(player, propertyName) {
  // Implement property buying logic
}

function sellProperty(player, propertyName) {
  // Implement property selling logic
}
