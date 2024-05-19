// data/arenas.js
const arenas = {
    // Example arena
    'colosseum': {
      name: 'Colosseum',
      description: 'Prove your might in the grand Colosseum',
      requirements: {
        level: 30,
        items: ['colosseum_token'],
      },
      objectives: [
        'Defeat 10 opponents',
        'Survive the final challenge',
      ],
      rewards: [
        {
          name: 'Gold',
          amount: 10000,
        },
        {
          name: 'Champion\'s Emblem',
          item: 'champions_emblem',
          amount: 1,
        },
      ],
    },
  };
  
  module.exports = arenas;
  