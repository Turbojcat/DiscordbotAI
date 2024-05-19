// utils/combatUtils.js
const { calculateDamage } = require('./gameUtils');

function performAttack(attacker, defender) {
  const damage = calculateDamage(attacker, defender);
  defender.health -= damage;

  return {
    damage,
    remainingHealth: defender.health,
  };
}

function isPlayerDead(player) {
  return player.health <= 0;
}

module.exports = {
  performAttack,
  isPlayerDead,
};
