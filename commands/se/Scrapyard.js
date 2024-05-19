const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { EmbedBuilder } = require('discord.js');
const { google } = require('googleapis');

module.exports = {
    data: {
        name: 'spacespawn',
        description: 'Get information about space spawns',
        aliases: ['sp'],
    },
    async execute(message, args) {
        const doc = new GoogleSpreadsheet('1nzhDqfmd3SUb39qp2yzS9SIr3JnCfOPtD0JTz9sIqf8');

        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const authClient = await auth.getClient();
            const sheets = google.sheets({ version: 'v4', auth: authClient });
            doc.useServiceAccountAuth(authClient);

            await doc.loadInfo();
            const sheet = doc.sheetsByIndex(1); // Assuming the data is in the second sheet (index 1)
            const rows = await sheet.getRows();

            const searchTerm = args.join(' ').toLowerCase();
            const matchingRow = rows.find(row => row.Name.toLowerCase() === searchTerm);

            if (!matchingRow) {
                return message.reply(`No information found for "${searchTerm}".`);
            }

            const embed = new EmbedBuilder()
                .setTitle(matchingRow.Name)
                .setDescription(matchingRow.Description)
                .addFields(
                    { name: 'Sector', value: matchingRow.Sector, inline: true },
                    { name: 'Coordinates', value: matchingRow.Coordinates, inline: true },
                    { name: 'Type', value: matchingRow.Type, inline: true },
                    { name: 'Spawn Rate', value: matchingRow.SpawnRate, inline: true },
                    { name: 'Respawn Time', value: matchingRow.RespawnTime, inline: true },
                );

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching space spawn data:', error);
            message.reply('An error occurred while fetching space spawn data.');
        }
    },
};
