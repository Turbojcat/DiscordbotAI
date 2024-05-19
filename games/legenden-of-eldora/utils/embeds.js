// utils/embeds.js
const { EmbedBuilder } = require('discord.js');

function createEmbed(title, description, fields = []) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(title)
    .setDescription(description);

  fields.forEach(field => {
    embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
  });

  return embed;
}

module.exports = {
  createEmbed,
};
