class Player {
    constructor(id, name, race, level = 1) {
        this.id = id;
        this.name = name;
        this.race = race;
        this.level = level;
        this.health = 100; // Default health
        this.attack = 10; // Default attack
        this.defense = 5; // Default defense
        this.experience = 0;
        this.inventory = [];
    }

    levelUp() {
        this.level++;
        this.health += 20;
        this.attack += 5;
        this.defense += 2;
    }

    addItem(item) {
        this.inventory.push(item);
    }
}

module.exports = Player;
