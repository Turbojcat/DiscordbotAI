// utils/shopUtils.js
function buyItem(player, shopId, itemId, quantity) {
    const shop = shopData[shopId];
    const item = shop.inventory[itemId];
  
    if (!shop || !item) {
      return false;
    }
  
    if (!checkShopRequirements(player, shop)) {
      return false;
    }
  
    if (item.quantity < quantity) {
      return false;
    }
  
    const totalCost = item.price * quantity;
  
    if (player.gold < totalCost) {
      return false;
    }
  
    player.gold -= totalCost;
    addItemToInventory(player, item, quantity);
    item.quantity -= quantity;
    return true;
  }
  
  function sellItem(player, shopId, itemId, quantity) {
    const shop = shopData[shopId];
    const item = shop.inventory[itemId];
  
    if (!shop || !item) {
      return false;
    }
  
    if (!checkShopRequirements(player, shop)) {
      return false;
    }
  
    if (!player.inventory[itemId] || player.inventory[itemId].amount < quantity) {
      return false;
    }
  
    const totalSellPrice = item.sellPrice * quantity;
    player.gold += totalSellPrice;
    removeItemFromInventory(player, itemId, quantity);
    return true;
  }
  
  function checkShopRequirements(player, shop) {
    // Implement shop requirement checking logic
    return true; // Placeholder
  }
  
  module.exports = {
    buyItem,
    sellItem,
  };
  