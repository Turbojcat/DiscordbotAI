class SocialInteraction {
    constructor(type, involvedCharacters) {
        this.type = type; // e.g., conversation, assistance, trade
        this.involvedCharacters = involvedCharacters;
    }

    executeInteraction() {
        console.log(`Interaction of type ${this.type} occurred between ${this.involvedCharacters.join(" and ")}.`);
    }
}

class SocialManager {
    constructor() {
        this.interactions = [];
    }

    logInteraction(interaction) {
        this.interactions.push(interaction);
        interaction.executeInteraction();
    }
}

module.exports = { SocialInteraction, SocialManager };
