// utils/inventoryUtils.js
function addItemToInventory(player, item, amount = 1) {
    const inventory = player.inventory;
  
    if (inventory[item.id]) {
      inventory[item.id].amount += amount;
    } else {
      inventory[item.id] = { ...item, amount };
    }
  }
  
  function removeItemFromInventory(player, itemId, amount = 1) {
    const inventory = player.inventory;
  
    if (!inventory[itemId]) {
      return false;
    }
  
    inventory[itemId].amount -= amount;
  
    if (inventory[itemId].amount <= 0) {
      delete inventory[itemId];
    }
  
    return true;
  }
  
  module.exports = {
    addItemToInventory,
    removeItemFromInventory,
  };
  