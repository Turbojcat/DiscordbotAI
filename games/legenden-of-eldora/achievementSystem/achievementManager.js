class Achievement {
    constructor(id, title, description, reward) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.reward = reward;
        this.isUnlocked = false;
    }

    unlock() {
        this.isUnlocked = true;
        console.log(`Achievement unlocked: ${this.title} - ${this.description}`);
    }
}

class AchievementManager {
    constructor() {
        this.achievements = [];
    }

    addAchievement(achievement) {
        this.achievements.push(achievement);
    }

    unlockAchievement(id) {
        const achievement = this.achievements.find(ach => ach.id === id);
        if (achievement && !achievement.isUnlocked) {
            achievement.unlock();
        }
    }
}

module.exports = { Achievement, AchievementManager };
