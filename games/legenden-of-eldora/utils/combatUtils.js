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
// games/legenden-om-eldoria/utils/combatUtils.js
const { calculateDamage, performAttack, isPlayerDead } = require('./gameUtils');
const { gainExperience } = require('./playerUtils');
const { gainSkillExperience } = require('./skillUtils');
const { dropLoot } = require('./lootUtils');

async function startCombat(player, monster) {
  let playerTurn = true;
  let combatLog = [];

  while (!isPlayerDead(player) && monster.health > 0) {
    if (playerTurn) {
      const playerAttack = await playerAttackPrompt(player, monster);
      if (playerAttack === 'attack') {
        const weapon = player.equipment.weapon;
        const attackResult = performAttack(player, monster, weapon);
        combatLog.push(`You attacked ${monster.name} with your ${weapon.name} for ${attackResult.damage} damage!`);
        gainSkillExperience(player, weapon.skill, attackResult.damage);
      } else if (playerAttack === 'flee') {
        combatLog.push('You fled from the battle!');
        break;
      }
    } else {
      const monsterAttackResult = performAttack(monster, player);
      combatLog.push(`${monster.name} attacked you for ${monsterAttackResult.damage} damage!`);
    }

    playerTurn = !playerTurn;
  }

  if (isPlayerDead(player)) {
    combatLog.push('You were defeated!');
  } else {
    combatLog.push(`You defeated ${monster.name}!`);
    const expGained = gainExperience(player, monster.experience);
    combatLog.push(`You gained ${expGained} experience points.`);
    const loot = dropLoot(monster.loot);
    if (loot.length > 0) {
      combatLog.push('You obtained the following loot:');
      loot.forEach(item => {
        combatLog.push(`- ${item.name} x${item.amount}`);
      });
    }
  }

  return combatLog;
}

async function playerAttackPrompt(player, monster) {
  // Implement player attack prompt logic
  return 'attack'; // Placeholder
}

module.exports = {
  startCombat,
};
