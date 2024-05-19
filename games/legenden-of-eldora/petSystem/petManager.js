class Pet {
    constructor(name, type, owner) {
        this.name = name;
        this.type = type; // e.g., dragon, wolf
        this.owner = owner;
    }

    performAction(action) {
        console.log(`${this.name} the ${this.type} performs ${action}.`);
    }
}

class PetManager {
    constructor() {
        this.pets = [];
    }

    addPet(pet) {
        this.pets.push(pet);
    }

    getPetByName(name) {
        return this.pets.find(pet => pet.name === name);
    }
}

module.exports = { Pet, PetManager };
