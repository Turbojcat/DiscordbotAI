// data/shops.js
const shops = {
    // Example shop
    'general_store': {
      name: 'General Store',
      description: 'A well-stocked general store',
      inventory: {
        'health_potion': {
          name: 'Health Potion',
          description: 'Restores 50 health points',
          price: 10,
          sellPrice: 5,
          quantity: 20,
        },
        'iron_sword': {
          name: 'Iron Sword',
          description: 'A sturdy iron sword',
          price: 100,
          sellPrice: 50,
          quantity: 5,
        },
      },
    },
  };
  
  module.exports = shops;
  