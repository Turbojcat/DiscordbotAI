class Spell {
    constructor(name, effect, manaCost) {
        this.name = name;
        this.effect = effect; // Description of what the spell does
        this.manaCost = manaCost;
    }

    cast(caster) {
        if (caster.mana >= this.manaCost) {
            caster.mana -= this.manaCost;
            console.log(`${caster.name} casts ${this.name}, causing ${this.effect}.`);
        } else {
            console.log(`${caster.name} does not have enough mana to cast ${this.name}.`);
        }
    }
}

class MagicManager {
    constructor() {
        this.spells = [];
    }

    addSpell(spell) {
        this.spells.push(spell);
    }

    castSpell(spellName, caster) {
        const spell = this.spells.find(s => s.name === spellName);
        if (spell) {
            spell.cast(caster);
        } else {
            console.log(`No spell named ${spellName} found.`);
        }
    }
}

module.exports = { Spell, MagicManager };
class MagicManager {
    constructor() {
        this.spells = {}; // Dictionary of spells by type and power level
        this.artifacts = {}; // Magical artifacts and their effects
        this.magicUsers = []; // Track magic users and their abilities
    }

    // Cast a spell with specific effects and resource costs
    castSpell(spellName, caster, target) {
        const spell = this.spells[spellName];
        if (caster.mana >= spell.manaCost) {
            caster.mana -= spell.manaCost;
            // Apply spell effects based on the spell type and target
            console.log(`${caster.name} casts ${spellName} on ${target.name}, causing ${spell.effect}.`);
        } else {
            console.log(`${caster.name} does not have enough mana to cast ${spellName}.`);
        }
    }

    // Enchant or create magical artifacts with specific powers
    createArtifact(artifactName, magicProperties) {
        this.artifacts[artifactName] = magicProperties;
        console.log(`Artifact created: ${artifactName} with properties ${JSON.stringify(magicProperties)}`);
    }

    // Manage the recovery and enhancement of magical abilities among magic users
    regenerateMana() {
        this.magicUsers.forEach(user => {
            user.mana += user.manaRegenRate;
            console.log(`${user.name}'s mana regenerated to ${user.mana}.`);
        });
    }
}

module.exports = { MagicManager };
