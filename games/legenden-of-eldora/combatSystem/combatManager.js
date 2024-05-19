const { calculateDamage } = require('../../utils/helpers/Helpers');

class CombatSession {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
    }

    executeAttack(isPlayerAttacking) {
        if (isPlayerAttacking) {
            const damage = calculateDamage(this.player.attack, this.monster.defense);
            this.monster.health -= damage;
            console.log(`Player attacks dealing ${damage} damage.`);
        } else {
            const damage = calculateDamage(this.monster.attack, this.player.defense);
            this.player.health -= damage;
            console.log(`Monster attacks dealing ${damage} damage.`);
        }
    }

    checkCombatOutcome() {
        if (this.player.health <= 0) {
            console.log('Player has been defeated.');
            return 'monster';
        } else if (this.monster.health <= 0) {
            console.log('Monster has been defeated.');
            return 'player';
        }
        return 'ongoing';
    }
}

module.exports = { CombatSession };
