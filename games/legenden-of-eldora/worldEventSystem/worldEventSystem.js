class WorldEvent {
    constructor(id, name, effect, duration) {
        this.id = id;
        this.name = name;
        this.effect = effect;
        this.duration = duration;
    }

    start() {
        console.log(`World event started: ${this.name} - ${this.effect}`);
        setTimeout(() => {
            this.end();
        }, this.duration);
    }

    end() {
        console.log(`World event ended: ${this.name}`);
    }
}

class WorldEventManager {
    constructor() {
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    triggerEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (event) {
            event.start();
        }
    }
}

module.exports = { WorldEvent, WorldEventManager };
