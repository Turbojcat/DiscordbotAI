const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const puppeteer = require('puppeteer');
const openai = require('openai');
const { PythonShell } = require('python-shell');
const { handleMessage } = require('./commands/level/levlingsystem');
const gamedig = require('gamedig');




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

client.on('messageCreate', (message) => {
    // Handle commands
    // ...
  
    // Handle leveling system
    handleMessage(message);
})

client.commands.set('python', {
    data: {
        name: 'python',
        description: 'Execute a Python script',
    },
    async execute(message, args) {
        const scriptPath = path.join(__dirname, 'path', 'to', 'hello.py'); // Replace with the actual path to your Python script
        const scriptArgs = args.slice(1); // Arguments to pass to the Python script

        try {
            const options = {
                mode: 'text',
                pythonPath: 'C:\\Program Files\\Python312\\python.exe', // Replace with the path to your Python installation
                pythonOptions: ['-u'],
                scriptPath: scriptPath,
                args: scriptArgs,
            };

            PythonShell.run(scriptPath, options, (err, results) => {
                if (err) {
                    console.error('Error executing Python script:', err);
                    message.reply('An error occurred while executing the Python script.');
                } else {
                    const output = results.join('\n');
                    message.reply(`\`\`\`\n${output}\n\`\`\``);
                }
            });
        } catch (error) {
            console.error('Error executing Python script:', error);
            message.reply('An error occurred while executing the Python script.');
        }
    },
});

// Event handler
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
   // console.log(`${bot.user.username} is on ${bot.guilds.cache.size} servers and monitoring ${bot.users.cache.size} users! ${bot.commands.size} commands and ${bot.commands.map(e => e.help.alias.length).reduce((x,y) => x + y)} aliases`)
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

client.commands.set('help', {
    data: {
        name: 'help',
        description: 'List all available commands',
    },
    execute(message, args) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('List of all available commands');

        const commands = client.commands.map(command => `\`${command.data.name}\` - ${command.data.description}`).join('\n');
        embed.addFields({ name: 'Commands', value: commands, inline: true });

        message.channel.send({ embeds: [embed] });
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
