const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
//const config = require('./config.js');
const fs = require('fs');
const { Client, Intents, MessageEmbed, Collection, MessageActionRow, MessageButton, Interaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const db = require('quick.db')
const mongoose = require("mongoose")


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


/*
fs.readdir('./commands/', (err, files) => {
    const commandHandler = require('./handler/commandHandler.js');
    commandHandler(err, files, client);
});*/


/*fs.readdir('./SlashCommands/', (err, files) => {
    const commandHandler = require('./handler/SlashHandler.js');
    commandHandler(err, files, client);
});
*/

client.login("ODg0ODY0MDM0MTU4MDUxMzk4.YTer2Q.RJrhxXow_Epz6TtF9G8RG3fKGVU")