const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'help',
        description: 'List all available commands',
    },
    execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('List of all available commands');

        const commands = client.commands.map(command => `\`${command.data.name}\` - ${command.data.description}`).join('\n');
        embed.addFields({ name: 'Commands', value: commands, inline: true });

        message.channel.send({ embeds: [embed] });
    },
};
