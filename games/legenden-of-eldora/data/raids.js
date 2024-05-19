// data/raids.js
const raids = {
    // Example raid
    'ancient_tomb': {
      name: 'Ancient Tomb',
      description: 'Explore the ancient tomb and uncover its secrets',
      requirements: {
        level: 20,
        items: ['ancient_key'],
      },
      objectives: [
        'Navigate the tomb\'s traps',
        'Defeat the tomb guardians',
        'Retrieve the ancient artifact',
      ],
      rewards: [
        {
          name: 'Gold',
          amount: 5000,
        },
        {
          name: 'Ancient Artifact',
          item: 'ancient_artifact',
          amount: 1,
        },
      ],
    },
  };
  
  module.exports = raids;
  