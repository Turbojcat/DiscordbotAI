class Enemy {
    constructor(name, level, health, attack, defense) {
        this.name = name;
        this.level = level;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`${this.name} takes ${amount} damage.`);
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        console.log(`${this.name} has been defeated.`);
    }
}

class EnemyManager {
    constructor() {
        this.enemies = [];
    }

    spawnEnemy(enemy) {
        this.enemies.push(enemy);
        console.log(`A wild ${enemy.name} appears!`);
    }

    findEnemyByName(name) {
        return this.enemies.find(e => e.name === name);
    }
}

module.exports = { Enemy, EnemyManager };
