class Reputation {
    constructor(character, faction, points) {
        this.character = character;
        this.faction = faction;
        this.points = points; // Positive or negative reputation points
    }

    modifyReputation(amount) {
        this.points += amount;
        console.log(`${this.character}'s reputation with ${this.faction} is now ${this.points}.`);
    }
}

class ReputationManager {
    constructor() {
        this.reputations = [];
    }

    adjustReputation(character, faction, amount) {
        let rep = this.reputations.find(r => r.character === character && r.faction === faction);
        if (rep) {
            rep.modifyReputation(amount);
        } else {
            rep = new Reputation(character, faction, amount);
            this.reputations.push(rep);
        }
    }
}

module.exports = { Reputation, ReputationManager };
