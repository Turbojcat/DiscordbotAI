class Character {
    constructor(playerId, attributes) {
        this.playerId = playerId;
        this.attributes = attributes; // Attributes like hair color, armor type, etc.
    }

    updateAttribute(attribute, value) {
        this.attributes[attribute] = value;
        console.log(`Character attribute ${attribute} updated to ${value}`);
    }
}

class CharacterManager {
    constructor() {
        this.characters = [];
    }

    createCharacter(playerId, attributes) {
        const character = new Character(playerId, attributes);
        this.characters.push(character);
        return character;
    }

    getCharacterByPlayerId(playerId) {
        return this.characters.find(char => char.playerId === playerId);
    }
}

module.exports = { Character, CharacterManager };
