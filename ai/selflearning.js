const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { EmbedBuilder } = require('discord.js');
dotenv.config();

// Funksjon for å tokenisere en streng
function tokenize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/);
}

// Funksjon for å laste inn og forberede data
const loadData = async () => {
    const dataDir = path.join(__dirname, 'data');
    const files = fs.readdirSync(dataDir);
    const documents = [];

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const sentences = content.split(/[.!?]+/);
        documents.push(...sentences);
    }

    // Laste inn lere.txt
    const lereFilePath = path.join(__dirname, 'lere.txt');
    const lereContent = fs.readFileSync(lereFilePath, 'utf8');
    const lereLines = lereContent.split('\n');
    const lereData = lereLines.map(line => line.split('|').filter(part => part.trim().length > 0));
    const lereQuestions = lereData.map(pair => pair.length > 0 ? pair[0].trim() : '');
    const lereAnswers = lereData.map(pair => pair.length > 1 ? pair[1].trim() : '');

    documents.push(...lereQuestions.filter(question => question.length > 0));

    return { documents, lereQuestions, lereAnswers };
};

// Funksjon for å klassifisere en melding
const classifyMessage = async (message, documents, lereQuestions, lereAnswers) => {
    const matchIndex = lereQuestions.indexOf(message);
    if (matchIndex !== -1) {
        return lereAnswers[matchIndex];
    }

    // Generer respons med Claude AI-modellen
    const response = await generateResponse(message, documents);
    updateLereFile(message, response);
    return response;
};

// Funksjon for å generere respons med Claude AI-modellen
const generateResponse = async (prompt, documents) => {
    const context = `Kontekst: ${documents.join(' ')}`;
    const payload = {
        model: "claude-v1",
        prompt: `${context}\n\nMelding: ${prompt}\nSvar:`,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["Melding:"]
    };

    try {
        console.log('Sending request to Anthropic API with payload:', payload);

        const response = await fetch('https://api.anthropic.com/v1/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.ANTHROPIC_API_KEY
            },
            body: JSON.stringify(payload)
        });

        console.log('Response from Anthropic API:', response);

        const data = await response.json();
        console.log('Data from Anthropic API:', data);

        if (!data.completion) {
            console.error('Anthropic API did not return a completion.');
        }

        return data.completion || 'Beklager, jeg klarte ikke å generere et svar.';
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Beklager, jeg klarte ikke å generere et svar.';
    }
};

// Funksjon for å oppdatere lere.txt med nye spørsmål og svar
const updateLereFile = (question, answer) => {
    // Sjekk om både spørsmål og svar er gyldige
    if (!question || !answer || question.trim().length === 0 || answer.trim().length === 0) {
        return;
    }

    const lereFilePath = path.join(__dirname, 'lere.txt');
    const newEntry = `${question}|${answer}`;

    try {
        fs.appendFileSync(lereFilePath, `\n${newEntry}`);
        console.log(`Oppdaterte lere.txt med nytt spørsmål/svar: ${newEntry}`);
    } catch (err) {
        console.error(`Feil ved oppdatering av lere.txt: ${err}`);
    }
};

module.exports = {
    loadSelfLearning: async (client) => {
        const { documents, lereQuestions, lereAnswers } = await loadData();

        // Håndtere meldinger
        client.on('messageCreate', async (message) => {
            if (message.author.bot) return;

            const response = await classifyMessage(message.content, documents, lereQuestions, lereAnswers);

            // Sjekk om responsen er gyldig
            if (!response || response.trim().length === 0) {
                console.log(`Mottok melding: "${message.content}", men genererte ingen gyldig respons.`);
                return;
            }

            // Opprett en Discord-embed med responsen
            const embed = new EmbedBuilder()
                .setDescription(response);

            console.log(`Message: ${message.content}\nResponse: ${response}`);
            message.channel.send({ embeds: [embed] });
        });
    },
};
