const nlp = require('compromise');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const doc = nlp(message.content);
    const intent = classifyIntent(doc);

    switch (intent) {
        case 'greeting':
            await message.reply('Hei! Hvordan kan jeg hjelpe deg i dag?');
            break;
        case 'weather':
            const location = extractLocation(doc);
            const weather = await getWeather(location);
            await message.reply(`Værmeldingen for ${location}: ${weather}`);
            break;
        case 'unknown':
            await message.reply('Beklager, jeg forstod ikke kommandoen din. Prøv å omformulere eller bruk !help for å se tilgjengelige kommandoer.');
            break;
        // Håndter flere intensjoner etter behov
    }
});

function classifyIntent(doc) {
    const tokens = doc.terms().out('array');

    // Implementer en modell for å klassifisere intensjonen basert på tokens
    // For eksempel ved hjelp av maskinlæring eller regelbaserte metoder
    if (tokens.includes('hei') || tokens.includes('hallo')) {
        return 'greeting';
    } else if (tokens.some(token => token.match(/vær/i))) {
        return 'weather';
    } else {
        return 'unknown';
    }
}

function extractLocation(doc) {
    const places = doc.places().out('array');
    return places.join(' ');
}

async function getWeather(location) {
    // Implementer en metode for å hente værdata fra en API eller annen kilde
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return `${data.weather[0].description}, ${data.main.temp}°C`;
}
