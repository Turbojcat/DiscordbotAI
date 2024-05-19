class House {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location; // e.g., village, city outskirts
        this.furniture = [];
    }

    addFurniture(item) {
        this.furniture.push(item);
        console.log(`Added ${item} to the house.`);
    }
}

class HousingManager {
    constructor() {
        this.houses = [];
    }

    addHouse(house) {
        this.houses.push(house);
    }

    getHouseByOwner(owner) {
        return this.houses.find(house => house.owner === owner);
    }
}

module.exports = { House, HousingManager };
