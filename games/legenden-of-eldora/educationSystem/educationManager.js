class Education {
    constructor() {
        this.courses = new Map();
    }

    addCourse(subject, skillIncrease) {
        this.courses.set(subject, skillIncrease);
        console.log(`Education update: Course on ${subject} improves skill by ${skillIncrease}.`);
    }

    getCourseEffect(subject) {
        return this.courses.get(subject) || 'Course not available';
    }
}

class EducationManager {
    constructor() {
        this.education = new Education();
    }

    enrollCharacter(character, subject) {
        const skillIncrease = this.education.getCourseEffect(subject);
        if (skillIncrease !== 'Course not available') {
            character.skills[subject] = (character.skills[subject] || 0) + skillIncrease;
            console.log(`${character.name} has improved in ${subject}. New skill level: ${character.skills[subject]}`);
        } else {
            console.log(skillIncrease);
        }
    }
}

module.exports = { Education, EducationManager };
