// utils/guildUtils.js
function createGuild(player, guildName) {
    const guildId = generateGuildId();
    const guild = {
      id: guildId,
      name: guildName,
      leader: player.id,
      members: [player.id],
      level: 1,
      experience: 0,
      bank: 0,
    };
  
    guildData[guildId] = guild;
    player.guild = guildId;
    return guildId;
  }
  
  function joinGuild(player, guildId) {
    const guild = guildData[guildId];
  
    if (!guild) {
      return false;
    }
  
    if (!checkGuildRequirements(player, guild)) {
      return false;
    }
  
    guild.members.push(player.id);
    player.guild = guildId;
    return true;
  }
  
  function leaveGuild(player) {
    const guildId = player.guild;
    const guild = guildData[guildId];
  
    if (!guild) {
      return false;
    }
  
    guild.members = guild.members.filter(memberId => memberId !== player.id);
  
    if (guild.members.length === 0) {
      delete guildData[guildId];
    } else if (guild.leader === player.id) {
      guild.leader = guild.members[0];
    }
  
    player.guild = null;
    return true;
  }
  
  function generateGuildId() {
    // Implement guild ID generation logic
    return 'guild_' + Math.random().toString(36).substr(2, 9);
  }
  
  function checkGuildRequirements(player, guild) {
    // Implement guild requirement checking logic
    return true; // Placeholder
  }
  
  module.exports = {
    createGuild,
    joinGuild,
    leaveGuild,
  };
  