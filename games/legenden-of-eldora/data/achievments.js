// data/achievements.js
const achievements = {
    // Example achievement
    'explore_all_regions': {
      name: 'Explorer',
      description: 'Explore all regions of the world',
      requirements: {
        regionsExplored: ['region1', 'region2', 'region3', 'region4'],
      },
      rewards: [
        {
          name: 'Explorer Title',
          description: 'Unlock the "Explorer" title',
        },
        {
          name: 'Exploration Bonus',
          description: '+10% experience gain from exploration',
        },
      ],
    },
  };
  
  module.exports = achievements;
  