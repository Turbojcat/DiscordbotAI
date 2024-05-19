class Weather {
    constructor() {
        this.currentWeather = 'Clear';
        this.weatherEffects = {
            'Clear': { visibility: 'high', movementSpeed: 1, healthImpact: 0 },
            'Rain': { visibility: 'medium', movementSpeed: 0.9, healthImpact: 0 },
            'Heavy Rain': { visibility: 'low', movementSpeed: 0.8, healthImpact: -0.1 },
            'Snow': { visibility: 'medium', movementSpeed: 0.7, healthImpact: -0.1 },
            'Blizzard': { visibility: 'very low', movementSpeed: 0.5, healthImpact: -0.2 },
            'Fog': { visibility: 'very low', movementSpeed: 1, healthImpact: 0 },
            'Windy': { visibility: 'high', movementSpeed: 1, healthImpact: 0 },
            'Storm': { visibility: 'low', movementSpeed: 0.6, healthImpact: -0.15 }
        };
    }

    changeWeather(newWeather) {
        this.currentWeather = newWeather;
        console.log(`Weather changed to ${newWeather}. Effects:`, this.weatherEffects[newWeather]);
        this.applyWeatherEffects();
    }

    applyWeatherEffects() {
        const effects = this.weatherEffects[this.currentWeather];
        // This method would interact with other systems to apply effects
        // For example, reducing visibility could affect player's detection range in the Combat System
        // Movement speed adjustments could be communicated to the Transportation System
        // Health impacts could be managed by the Healthcare System
        globalEventEmitter.emit('weatherChange', effects);
    }
}

class WeatherManager {
    constructor() {
        this.weather = new Weather();
        this.setupWeatherListeners();
    }

    simulateWeatherChange() {
        const weatherTypes = Object.keys(this.weather.weatherEffects);
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        this.weather.changeWeather(randomWeather);
    }

    setupWeatherListeners() {
        globalEventEmitter.on('weatherChange', (effects) => {
            // Handle the global effects of weather change
            // For example, adjust NPC behavior in the NPC System based on visibility
            // Adjust the difficulty of quests or events triggered by severe weather in the Quest System
            console.log("Applying weather effects across systems:", effects);
        });
    }
}

module.exports = { Weather, WeatherManager };
