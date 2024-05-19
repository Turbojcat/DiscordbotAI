// games/legenden-om-eldoria/data/items.js
const items = {
    'health_potion': {
      name: 'Health Potion',
      description: 'Restores 50 health points',
      type: 'consumable',
      stats: {
        healthRestored: 50,
      },
    },
    'iron_sword': {
      name: 'Iron Sword',
      description: 'A sturdy iron sword',
      type: 'weapon',
      stats: {
        damage: 10,
      },
    },
  };
  
  module.exports = items;
  