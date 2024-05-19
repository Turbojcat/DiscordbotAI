// games/legenden-om-eldoria/utils/settlementUtils.js
const settlements = require('../data/settlements');

function visitSettlement(player, settlementId) {
  const settlement = settlements[settlementId];

  if (!settlement) {
    return false;
  }

  // Add logic for visiting the settlement
  // For example, display settlement information, allow trading, questing, etc.

  return true;
}

module.exports = {
  visitSettlement,
};
