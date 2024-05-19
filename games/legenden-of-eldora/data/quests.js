// data/quests.js
const quests = {
    // Example quest
    'slay_the_dragon': {
      name: 'Slay the Dragon',
      description: 'Defeat the fearsome dragon terrorizing the village',
      requirements: {
        level: 10,
        items: ['dragonslayer_sword'],
      },
      objectives: [
        'Locate the dragon\'s lair',
        'Defeat the dragon',
      ],
      rewards: [
        {
          name: 'Gold',
          amount: 1000,
        },
        {
          name: 'Dragon Scale',
          item: 'dragon_scale',
          amount: 1,
        },
      ],
    },
    'slay_goblins': {
      name: 'Slay Goblins',
      description: 'Defeat 10 goblins in the nearby forest',
      requirements: {
        level: 1,
      },
      objectives: [
        {
          type: 'kill_monsters',
          target: 'goblin',
          amount: 10,
        },
      ],
      rewards: [
        { type: 'experience', amount: 100 },
        { type: 'item', item: 'iron_sword', amount: 1 },
      ],
    },
  };
  
  module.exports = quests;
  