// games/legenden-om-eldoria/utils/lootUtils.js
const items = require('../data/items');

function dropLoot(lootTable) {
  const droppedLoot = [];

  lootTable.forEach(lootItem => {
    const { item, amount, chance } = lootItem;
    if (Math.random() < chance) {
      droppedLoot.push({
        name: items[item].name,
        amount,
      });
    }
  });

  return droppedLoot;
}

module.exports = {
  dropLoot,
};
