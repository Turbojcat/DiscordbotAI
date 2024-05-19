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
  
  // games/legenden-om-eldoria/utils/farmingUtils.js
const farms = require('../data/farms');

function buyFarm(player, farmId) {
  const farm = farms[farmId];

  if (!farm) {
    return false;
  }

  if (player.gold < farm.price) {
    return false;
  }

  player.gold -= farm.price;
  player.ownedFarms.push(farmId);

  return true;
}

function collectFarmIncome(player) {
  let totalIncome = 0;

  for (const farmId of player.ownedFarms) {
    const farm = farms[farmId];
    totalIncome += farm.income;
  }

  player.gold += totalIncome;

  return totalIncome;
}

module.exports = {
  buyFarm,
  collectFarmIncome,
};
