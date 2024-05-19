// games/legenden-om-eldoria/data/skills.js
const skills = {
    'swordsmanship': {
      name: 'Swordsmanship',
      description: 'Increases your damage with swords',
      levels: [
        { level: 1, damageBonus: 0 },
        { level: 2, damageBonus: 2 },
        { level: 3, damageBonus: 4 },
        // Add more levels as needed
      ],
    },
    'archery': {
      name: 'Archery',
      description: 'Increases your damage with bows',
      levels: [
        { level: 1, damageBonus: 0 },
        { level: 2, damageBonus: 3 },
        { level: 3, damageBonus: 6 },
        // Add more levels as needed
      ],
    },
  };
  
  module.exports = skills;
  