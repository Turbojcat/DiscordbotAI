// utils/farmingUtils.js
function buyFarm(player, farmId) {
    const farm = farmData[farmId];
  
    if (!farm) {
      return false;
    }
  
    if (!checkFarmRequirements(player, farm)) {
      return false;
    }
  
    player.ownedFarms.push(farmId);
    player.gold -= farm.price;
    return true;
  }
  
  function sellFarm(player, farmId) {
    const farm = farmData[farmId];
  
    if (!farm) {
      return false;
    }
  
    if (!player.ownedFarms.includes(farmId)) {
      return false;
    }
  
    player.ownedFarms = player.ownedFarms.filter(id => id !== farmId);
    player.gold += farm.sellPrice;
    return true;
  }
  
  function checkFarmRequirements(player, farm) {
    // Implement farm requirement checking logic
    return true; // Placeholder
  }
  
  module.exports = {
    buyFarm,
    sellFarm,
  };
  