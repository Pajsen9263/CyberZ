const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Check someones avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user to check")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const embed = {
      color: 0x76c7b4,
      title: user.username + "'s Avatar",
      image: {
        url: user.avatarURL(),
      },
      timestamp: new Date(),
      footer: {
        text: "Made by Zyner",
        icon_url: interaction.client.user.displayAvatarURL(),
      },
    };
    await interaction.reply({ embeds: [embed] });
  },
};