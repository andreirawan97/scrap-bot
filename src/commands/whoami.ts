import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  Attachment,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";

import { Command } from "../types/Command";

export const WhoAmI: Command = {
  name: "whoami",
  description: "Returns an user information",
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    const { username, discriminator, createdAt, bot, accentColor } =
      interaction.user;

    const userEmbed = new EmbedBuilder()
      .setColor(accentColor ?? 0x0099ff)
      .setTitle(`${username} #${discriminator}`)
      .setThumbnail(interaction.user.avatarURL())
      .addFields({ name: "Created At", value: createdAt.toString() })
      .addFields({
        name: "Is A Bot?  🤖",
        value: bot ? "Yes" : "No",
        inline: true,
      });

    await interaction.followUp({
      ephemeral: true,
      embeds: [userEmbed],
    });
  },
};
