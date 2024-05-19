// utils/allianceUtils.js
function createAlliance(player, allianceName) {
    const allianceId = generateAllianceId();
    const alliance = {
      id: allianceId,
      name: allianceName,
      leader: player.id,
      guilds: [],
      level: 1,
      experience: 0,
    };
  
    allianceData[allianceId] = alliance;
    const playerGuild = guildData[player.guild];
    playerGuild.alliance = allianceId;
    alliance.guilds.push(player.guild);
    return allianceId;
  }
  
  function joinAlliance(guildId, allianceId) {
    const alliance = allianceData[allianceId];
    const guild = guildData[guildId];
  
    if (!alliance || !guild) {
      return false;
    }
  
    if (!checkAllianceRequirements(guild, alliance)) {
      return false;
    }
  
    guild.alliance = allianceId;
    alliance.guilds.push(guildId);
    return true;
  }
  
  function leaveAlliance(guildId) {
    const guild = guildData[guildId];
  
    if (!guild || !guild.alliance) {
      return false;
    }
  
    const allianceId = guild.alliance;
    const alliance = allianceData[allianceId];
  
    alliance.guilds = alliance.guilds.filter(id => id !== guildId);
    guild.alliance = null;
  
    if (alliance.guilds.length === 0) {
      delete allianceData[allianceId];
    }
  
    return true;
  }
  
  function generateAllianceId() {
    // Implement alliance ID generation logic
    return 'alliance_' + Math.random().toString(36).substr(2, 9);
  }
  
  function checkAllianceRequirements(guild, alliance) {
    // Implement alliance requirement checking logic
    return true; // Placeholder
  }
  
  module.exports = {
    createAlliance,
    joinAlliance,
    leaveAlliance,
  };
  
  // games/legenden-om-eldoria/utils/guildUtils.js
const guilds = require('../data/guilds');

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

  guilds[guildId] = guild;
  player.guild = guildId;

  return guildId;
}

function joinGuild(player, guildId) {
  const guild = guilds[guildId];

  if (!guild) {
    return false;
  }

  guild.members.push(player.id);
  player.guild = guildId;

  return true;
}

function leaveGuild(player) {
  const guildId = player.guild;
  const guild = guilds[guildId];

  if (!guild) {
    return false;
  }

  guild.members = guild.members.filter(memberId => memberId !== player.id);

  if (guild.members.length === 0) {
    delete guilds[guildId];
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

module.exports = {
  createGuild,
  joinGuild,
  leaveGuild,
};
