const { Client, GatewayIntentBits, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const puppeteer = require('puppeteer');
const openai = require('openai');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

const dotenv = require('dotenv');
dotenv.config();

// Set up OpenAI API
const configuration = new openai.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openaiApi = new openai.OpenAIApi(configuration);

// Set up Puppeteer
let browser;
(async () => {
    browser = await puppeteer.launch();
})();

// Set the client.commands property to a new Collection object
client.commands = new Collection();

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
                    client.commands.set(command.data.name, { ...command, openaiApi });
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
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        activities: [{ name: 'Hello', type: 'LISTENING' }],
        status: 'online'
    });
});


client.on('messageCreate', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        console.log(`Executing ${commandName} command`);
        await command.execute(message, args);
    } catch (error) {
        console.error(`Error executing ${commandName} command:`, error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Advanced help system
client.commands.set('help', {
    data: {
        name: 'help',
        description: 'Displays a list of available commands',
    },
    execute(message) {
        const commands = client.commands.map(command => command.data);
        const helpEmbed = new MessageEmbed()
            .setTitle('Help')
            .setDescription('Here is a list of available commands:')
            .setColor('BLUE');

        commands.forEach(command => {
            helpEmbed.addField(command.name, command.description, true);
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
