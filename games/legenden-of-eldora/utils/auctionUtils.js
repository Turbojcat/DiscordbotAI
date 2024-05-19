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
  