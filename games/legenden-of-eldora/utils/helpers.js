module.exports = { handleAttack };
function calculateDamage(attack, defense) {
    return Math.max(attack - defense, 0);
}

function gainExperience(monsterLevel, playerLevel) {
    return Math.max(20 + (monsterLevel - playerLevel) * 5, 10);
}

function isPlayerDead(player) {
    return player.health <= 0;
}

module.exports = { calculateDamage, gainExperience, isPlayerDead };
