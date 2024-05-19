// games/legenden-om-eldoria/utils/saveUtils.js
const fs = require('fs');
const path = require('path');

const SAVE_DIR = path.join(__dirname, '..', 'saves');

function savePlayerData(player) {
  const playerSavePath = path.join(SAVE_DIR, `player_${player.id}.json`);
  const playerData = {
    id: player.id,
    name: player.name,
    level: player.level,
    experience: player.experience,
    health: player.health,
    gold: player.gold,
    inventory: player.inventory,
    skills: player.skills,
    guild: player.guild,
    ownedFarms: player.ownedFarms,
    ownedProperties: player.ownedProperties,
  };

  fs.writeFileSync(playerSavePath, JSON.stringify(playerData, null, 2));
}

function loadPlayerData(playerId) {
  const playerSavePath = path.join(SAVE_DIR, `player_${playerId}.json`);

  if (!fs.existsSync(playerSavePath)) {
    return null;
  }

  const playerData = JSON.parse(fs.readFileSync(playerSavePath, 'utf8'));

  return playerData;
}

function saveGameState() {
  const gameStatePath = path.join(SAVE_DIR, 'game_state.json');
  const gameState = {
    guilds: guilds,
    alliances: alliances,
    auctions: auctions,
    trades: trades,
    // Add any other game state data you want to save
  };

  fs.writeFileSync(gameStatePath, JSON.stringify(gameState, null, 2));
}

function loadGameState() {
  const gameStatePath = path.join(SAVE_DIR, 'game_state.json');

  if (!fs.existsSync(gameStatePath)) {
    return null;
  }

  const gameState = JSON.parse(fs.readFileSync(gameStatePath, 'utf8'));

  return gameState;
}

module.exports = {
  savePlayerData,
  loadPlayerData,
  saveGameState,
  loadGameState,
};
