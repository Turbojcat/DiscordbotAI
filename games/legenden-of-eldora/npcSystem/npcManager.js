class NPC {
    constructor(name, dialogues, quests) {
        this.name = name;
        this.dialogues = dialogues;
        this.quests = quests;
    }

    interact(option) {
        if (option === 'talk') {
            console.log(`NPC ${this.name} says: "${this.dialogues.shift() || 'I have nothing more to say.'}"`);
        } else if (option === 'quest') {
            return this.quests.shift() || 'No more quests available.';
        }
    }
}

module.exports = { NPC };
