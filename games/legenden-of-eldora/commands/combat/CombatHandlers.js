const { calculateDamage, isPlayerDead } = require('../../utils/helpers/Helpers');

function handleAttack(player, monster) {
    const playerDamage = calculateDamage(player.attack, monster.defense);
    monster.health -= playerDamage;
    if (monster.health <= 0) {
        console.log(`${player.name} defeated ${monster.name}`);
        return;
    }

    const monsterDamage = calculateDamage(monster.attack, player.defense);
    player.health -= monsterDamage;
    if (isPlayerDead(player)) {
        console.log(`${player.name} has been defeated by ${monster.name}`);
    }
}

module.exports = { handleAttack };
