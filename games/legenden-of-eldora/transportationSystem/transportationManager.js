class Transportation {
    constructor() {
        this.routes = new Map();
    }

    addRoute(startPoint, endPoint, travelTime) {
        this.routes.set(`${startPoint}-${endPoint}`, travelTime);
        console.log(`Transportation update: Route from ${startPoint} to ${endPoint} takes ${travelTime} minutes.`);
    }

    getTravelTime(startPoint, endPoint) {
        return this.routes.get(`${startPoint}-${endPoint}`) || 'Route not available';
    }
}

class TransportationManager {
    constructor() {
        this.transportation = new Transportation();
    }

    travel(player, startPoint, endPoint) {
        const travelTime = this.transportation.getTravelTime(startPoint, endPoint);
        if (travelTime !== 'Route not available') {
            console.log(`${player.name} is traveling from ${startPoint} to ${endPoint}. Estimated travel time: ${travelTime} minutes.`);
        } else {
            console.log(travelTime);
        }
    }
}

module.exports = { Transportation, TransportationManager };
