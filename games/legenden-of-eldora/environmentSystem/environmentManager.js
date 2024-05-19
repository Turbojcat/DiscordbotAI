class Environment {
    constructor(type, interactions) {
        this.type = type; // e.g., forest, dungeon, town
        this.interactions = interactions; // Possible interactions in this environment
    }

    interact(action) {
        if (this.interactions.includes(action)) {
            console.log(`Performing ${action} in a ${this.type}`);
        } else {
            console.log(`Action ${action} not possible in a ${this.type}`);
        }
    }
}

class EnvironmentManager {
    constructor() {
        this.environments = [];
    }

    addEnvironment(environment) {
        this.environments.push(environment);
    }

    getEnvironmentByType(type) {
        return this.environments.find(env => env.type === type);
    }
}

module.exports = { Environment, EnvironmentManager };
class EnvironmentManager {
    constructor() {
        this.environmentalFactors = {
            'pollution': 0,
            'forestHealth': 100,
            'waterQuality': 100,
            'wildlifePopulation': 100
        };
    }

    // Adjust environmental factors based on player actions or natural events
    updateEnvironment(action, impact) {
        // Example actions: 'logging', 'fishing', 'industrial', 'conservation'
        Object.keys(impact).forEach(factor => {
            this.environmentalFactors[factor] += impact[factor];
        });
        console.log(`Environment updated due to ${action}: ${JSON.stringify(this.environmentalFactors)}`);
    }

    // Simulate natural recovery or degradation over time
    naturalEnvironmentalChanges() {
        // Simulate natural processes like reforestation, erosion, or pollution dissipation
        if (this.environmentalFactors['forestHealth'] < 100) {
            this.environmentalFactors['forestHealth'] += 0.5; // Slow natural recovery
        }
        if (this.environmentalFactors['pollution'] > 0) {
            this.environmentalFactors['pollution'] -= 0.3; // Natural dissipation of pollution
        }
        console.log("Natural environmental changes applied.");
    }

    // Generate environmental events based on current conditions
    triggerEnvironmentalEvents() {
        if (this.environmentalFactors['pollution'] > 80) {
            // Trigger negative events like acid rain or poor crop yields
            console.log("High pollution levels trigger acid rain, affecting crop yields.");
        }
        if (this.environmentalFactors['forestHealth'] < 50) {
            // Trigger events like increased wildlife encounters or forest fires
            console.log("Low forest health triggers increased wildlife encounters.");
        }
    }
}

module.exports = { EnvironmentManager };
