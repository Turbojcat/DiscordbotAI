const Discord = require('discord.js');
const { GatewayIntentBits } = Discord;
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const puppeteer = require('puppeteer');
const { Configuration, OpenAIApi } = require('openai');

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

const dotenv = require('dotenv');
dotenv.config();

// Set up OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up Puppeteer
let browser;
(async () => {
    browser = await puppeteer.launch();
})();

// Set the client.commands property to a new Collection object
client.commands = new Discord.Collection();

// Load commands from commands folder and subfolders
const loadCommands = async dir => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            await loadCommands(filePath);
        } else if (file.endsWith('.js')) {
            try {
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    console.log(`Loaded command: ${command.data.name}`);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            } catch (error) {
                console.error(`[ERROR] Failed to load command at ${filePath}:`, error);
            }
        }
    }
};

loadCommands(path.join(__dirname, 'commands'));

// Event handler
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Hello', { type: 'LISTENING' });
});

client.on('messageCreate', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'search') {
        const query = args.join(' ');
        const page = await browser.newPage();

        try {
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
            const searchResults = await page.evaluate(() => {
                const results = Array.from(document.querySelectorAll('div.g'));
                return results.map((result) => result.textContent);
            });

            const prompt = `Search query: ${query}\n\nSearch results:\n${searchResults.join('\n\n')}\n\nProvide a summary of the search results:`;
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt,
                max_tokens: 1024,
                n: 1,
                stop: null,
                temperature: 0.7,
            });

            message.reply(response.data.choices[0].text);
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while processing your request.');
        } finally {
            await page.close();
        }
    } else {
        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            console.log(`Executing ${commandName} command`);
            await command.execute(message, args);
        } catch (error) {
            console.error(`Error executing ${commandName} command:`, error);
            message.reply('There was an error trying to execute that command!');
        }
    }
});

// Advanced help system
client.commands.set('help', {
    data: {
        name: 'help',
        description: 'Displays a list of available commands',
    },
    execute(message) {
        const commands = client.commands.array();
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle('Help')
            .setDescription('Here is a list of available commands:')
            .setColor('BLUE');

        commands.forEach(command => {
            helpEmbed.addField(command.data.name, command.data.description, true);
        });

        message.channel.send({ embeds: [helpEmbed] });
    },
});

const { REST, Routes } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

const commandData = [];
for (const command of client.commands.values()) {
    commandData.push(command.data);
    console.log(`Registering command: ${command.data.name}`);
}

(async () => {
    try {
        console.log(`Started refreshing ${commandData.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commandData },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('Error refreshing application (/) commands:', error);
    }
})();

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);
