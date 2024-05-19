// data/events.js
const events = {
    // Example event
    'festival_of_lights': {
      name: 'Festival of Lights',
      description: 'Participate in the annual Festival of Lights celebration',
      requirements: {
        level: 5,
      },
      objectives: [
        'Light the ceremonial torches',
        'Perform the ritual dance',
      ],
      rewards: [
        {
          name: 'Experience',
          amount: 1000,
        },
        {
          name: 'Festival Token',
          item: 'festival_token',
          amount: 5,
        },
      ],
    },
  };
  
  module.exports = events;
  