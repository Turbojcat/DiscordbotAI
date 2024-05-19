// games/legenden-om-eldoria/utils/economyUtils.js
const settlements = require('../data/settlements');

function updateEconomy() {
  Object.values(settlements).forEach(settlement => {
    const population = settlement.population;
    const resourceProduction = {
      wood: 10 * population,
      food: 5 * population,
      // Add more resources
    };

    Object.entries(resourceProduction).forEach(([resource, amount]) => {
      settlement.resources[resource] += amount;
    });
  });
}

module.exports = {
  updateEconomy,
};
