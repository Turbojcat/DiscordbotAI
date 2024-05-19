// utils/housingUtils.js
function buyHouse(player, houseId) {
    const house = houseData[houseId];
  
    if (!house) {
      return false;
    }
  
    if (!checkHouseRequirements(player, house)) {
      return false;
    }
  
    player.ownedHouses.push(houseId);
    player.gold -= house.price;
    return true;
  }
  
  function sellHouse(player, houseId) {
    const house = houseData[houseId];
  
    if (!house) {
      return false;
    }
  
    if (!player.ownedHouses.includes(houseId)) {
      return false;
    }
  
    player.ownedHouses = player.ownedHouses.filter(id => id !== houseId);
    player.gold += house.sellPrice;
    return true;
  }
  
  function checkHouseRequirements(player, house) {
    // Implement house requirement checking logic
    return true; // Placeholder
  }
  
  module.exports = {
    buyHouse,
    sellHouse,
  };
  