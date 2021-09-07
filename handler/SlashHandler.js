const fs = require('fs');

module.exports = (err, files, client) => {
    const commandFiles = fs.readdirSync('./SlashCommands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./SlashCommands/${file}`);
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

}