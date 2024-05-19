// games/legenden-om-eldoria/data/monsters.js
const monsters = {
    'goblin': {
      name: 'Goblin',
      description: 'A pesky little creature',
      level: 1,
      health: 20,
      attack: 5,
      defense: 2,
      experience: 10,
      loot: [
        { item: 'gold', amount: 5, chance: 0.8 },
        { item: 'health_potion', amount: 1, chance: 0.2 },
      ],
    },
  };
  
  module.exports = monsters;