class Event {
    constructor(name, description, duration, effects) {
        this.name = name;
        this.description = description;
        this.duration = duration; // in minutes
        this.effects = effects; // effects on the game world or players
        this.isActive = false;
    }

    startEvent() {
        this.isActive = true;
        console.log(`Event started: ${this.name} - ${this.description}`);
        setTimeout(() => this.endEvent(), this.duration * 60000);
    }

    endEvent() {
        this.isActive = false;
        console.log(`Event ended: ${this.name}`);
    }
}

class EventManager {
    constructor() {
        this.events = [];
    }

    scheduleEvent(event) {
        this.events.push(event);
    }

    triggerEvent(eventName) {
        const event = this.events.find(e => e.name === eventName && !e.isActive);
        if (event) {
            event.startEvent();
        }
    }
}

module.exports = { Event, EventManager };
