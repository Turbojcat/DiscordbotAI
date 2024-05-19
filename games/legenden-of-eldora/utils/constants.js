// utils/constants.js
const SKILL_LEVELS = {
    1: { totalExperience: 100 },
    2: { totalExperience: 300 },
    3: { totalExperience: 600 },
    // ... add more levels as needed
  };
  
  const MONSTER_LEVELS = {
    1: { health: 50, attack: 10, defense: 5 },
    2: { health: 100, attack: 20, defense: 10 },
    3: { health: 200, attack: 30, defense: 15 },
    // ... add more levels as needed
  };
  
  const ITEM_RARITIES = {
    COMMON: { name: 'Common', color: 0x9d9d9d },
    UNCOMMON: { name: 'Uncommon', color: 0x1eff00 },
    RARE: { name: 'Rare', color: 0x0070dd },
    EPIC: { name: 'Epic', color: 0xa335ee },
    LEGENDARY: { name: 'Legendary', color: 0xff8000 },
  };
  
  module.exports = { SKILL_LEVELS, MONSTER_LEVELS, ITEM_RARITIES };
  