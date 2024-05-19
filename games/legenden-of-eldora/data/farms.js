// data/farms.js
const farms = {
    // Example farm
    'wheat_farm': {
      name: 'Wheat Farm',
      description: 'A fertile farm for growing wheat',
      price: 10000,
      sellPrice: 6000,
      size: 'medium',
      crops: ['wheat'],
    },
    'oakwood_farm': {
      name: 'Oakwood Farm',
      description: 'A farm on the outskirts of the Village of Oakwood',
      type: 'crop',
      size: 'small',
      crops: ['wheat', 'vegetables'],
      price: 1000,
      income: 50, // Daily income
    },
  };
  
  module.exports = farms;
  