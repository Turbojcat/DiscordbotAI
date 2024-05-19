class Skill {
    constructor(name, level, maxLevel) {
        this.name = name;
        this.level = level;
        this.maxLevel = maxLevel;
    }

    increaseLevel() {
        if (this.level < this.maxLevel) {
            this.level++;
            console.log(`${this.name} skill increased to level ${this.level}.`);
        } else {
            console.log(`${this.name} skill is at maximum level.`);
        }
    }
}

class SkillManager {
    constructor() {
        this.skills = [];
    }

    addSkill(skill) {
        this.skills.push(skill);
    }

    trainSkill(skillName) {
        const skill = this.skills.find(s => s.name === skillName);
        if (skill) {
            skill.increaseLevel();
        } else {
            console.log('Skill not found.');
        }
    }
}

module.exports = { Skill, SkillManager };
