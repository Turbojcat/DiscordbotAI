const { MessageEmbed: MessageEmbedBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'help',
    description: 'List all available commands',
    execute(message, args, client) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('List of all available commands');

        const commands = client.commands.map(command => `\`${command.name}\` - ${command.description}`).join('\n');
        embed.addField('Commands', commands, true);

        message.channel.send({ embeds: [embed] });
    },
};
