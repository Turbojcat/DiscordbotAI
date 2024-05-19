// commands/social/party.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'party',
  description: 'Manage your party',
  execute(message, args) {
    const player = playerData[message.author.id];
    const subcommand = args[0];

    if (!subcommand) {
      // Display party information
      const party = player.party;

      if (!party || party.length === 0) {
        const noPartyEmbed = createEmbed(
          'Party',
          'You are not in a party.'
        );
        return message.reply({ embeds: [noPartyEmbed] });
      }

      const partyEmbed = createEmbed(
        'Party Information',
        'Here are the members of your party:',
        party.map(member => ({ name: member.name, value: `Level: ${member.level}` }))
      );

      message.reply({ embeds: [partyEmbed] });
    } else if (subcommand === 'create') {
      // Create a new party
      createParty(player);
    } else if (subcommand === 'invite') {
      // Invite a player to the party
      const targetPlayer = args[1];
      inviteToParty(player, targetPlayer);
    } else if (subcommand === 'leave') {
      // Leave the current party
      leaveParty(player);
    }
  },
};

function createParty(player) {
  // Implement party creation logic
}

function inviteToParty(player, targetPlayer) {
  // Implement party invitation logic
}

function leaveParty(player) {
  // Implement party leaving logic
}
