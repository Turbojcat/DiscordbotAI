// utils/propertyUtils.js
function buyProperty(player, propertyId) {
    const property = propertyData[propertyId];
  
    if (!property) {
      return false;
    }
  
    if (!checkPropertyRequirements(player, property)) {
      return false;
    }
  
    player.ownedProperties.push(propertyId);
    player.gold -= property.price;
    return true;
  }
  
  function sellProperty(player, propertyId) {
    const property = propertyData[propertyId];
  
    if (!property) {
      return false;
    }
  
    if (!player.ownedProperties.includes(propertyId)) {
      return false;
    }
  
    player.ownedProperties = player.ownedProperties.filter(id => id !== propertyId);
    player.gold += property.sellPrice;
    return true;
  }
  
  function checkPropertyRequirements(player, property) {
    // Implement property requirement checking logic
    return true; // Placeholder
  }
  
  module.exports = {
    buyProperty,
    sellProperty,
  };
// games/legenden-om-eldoria/utils/propertyUtils.js
const properties = require('../data/properties');

function buyProperty(player, propertyId) {
  const property = properties[propertyId];

  if (!property) {
    return false;
  }

  if (player.gold < property.price) {
    return false;
  }

  player.gold -= property.price;
  player.ownedProperties.push(propertyId);

  return true;
}

function collectPropertyIncome(player) {
  let totalIncome = 0;

  for (const propertyId of player.ownedProperties) {
    const property = properties[propertyId];
    totalIncome += property.income;
  }

  player.gold += totalIncome;

  return totalIncome;
}

module.exports = {
  buyProperty,
  collectPropertyIncome,
};
  