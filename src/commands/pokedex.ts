import axios from "axios";
import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
  ApplicationCommandOptionType,
} from "discord.js";

import { Command } from "../types/Command";

export const Pokedex: Command = {
  name: "pokedex",
  description: "Returns an information about a Pokemon",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      required: true,
      name: "query",
      type: ApplicationCommandOptionType.String,
      description: "Enter a Pokemon name. Or the id.",
    },
  ],
  run: async (_: Client, interaction: CommandInteraction) => {
    const [query] = interaction.options.data;

    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${String(query.value)}`
      );

      const pokemonEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(data.name)
        .setThumbnail(data.sprites.front_default)
        .addFields(
          {
            name: "Weight",
            value: String(data.weight),
            inline: true,
          },
          {
            name: "Height",
            value: String(data.height),
            inline: true,
          }
        );

      await interaction.followUp({
        ephemeral: true,
        embeds: [pokemonEmbed],
      });
    } catch (e) {
      console.error(e);
      await interaction.followUp({
        ephemeral: true,
        content: "Error occured: `" + e + "`",
      });
    }
  },
};
