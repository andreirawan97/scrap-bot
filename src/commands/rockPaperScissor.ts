import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";

import { Command } from "../types/Command";

const isValidOption = (option: string) => {
  const _option = option.toLowerCase();

  return _option === "rock" || _option === "scissor" || _option === "paper";
};

const getRandomOption = () => {
  const options = ["rock", "paper", "scissor"];

  const randomIndex = Math.ceil(Math.random() * 2);

  return options[randomIndex];
};

const getMatchResult = (userOption: string, computerOption: string) => {
  if (userOption === "rock") {
    if (computerOption === "rock") {
      return "draw";
    } else if (computerOption === "paper") {
      return "lose";
    } else {
      return "win";
    }
  } else if (userOption === "paper") {
    if (computerOption === "rock") {
      return "win";
    } else if (computerOption === "paper") {
      return "draw";
    } else {
      return "lose";
    }
  } else {
    if (computerOption === "rock") {
      return "lose";
    } else if (computerOption === "paper") {
      return "win";
    } else {
      return "draw";
    }
  }
};

const contentBuilder = (
  userOption: string,
  computerOption: string,
  matchResult: string
): string => {
  if (matchResult === "win") {
    return `😀  You choose: ${userOption}.\n🤖  Computer choose: ${computerOption}.\n\n**You win the game!** 🎉`;
  } else if (matchResult === "lose") {
    return `😀  You choose: ${userOption}.\n🤖  Computer choose: ${computerOption}.\n\n**You lose the game!** 👀`;
  } else {
    return `😀  You choose: ${userOption}.\n🤖  Computer choose: ${computerOption}.\n\n**It's a Draw!** 😶‍🌫️`;
  }
};

export const RockPaperScissor: Command = {
  name: "rps",
  description: "Play a Rock, Paper, Scissor! Game ✌️ 🖐 ✊",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      required: true,
      name: "option",
      type: ApplicationCommandOptionType.String,
      description: "Enter either `rock`, `paper`, and `scissor`",
    },
  ],
  run: async (_: Client, interaction: CommandInteraction) => {
    const [userOption] = interaction.options.data;

    if (isValidOption(String(userOption.value))) {
      const computerOption = getRandomOption();

      const matchResult = getMatchResult(
        String(userOption.value),
        computerOption
      );

      await interaction.followUp({
        ephemeral: true,
        content: contentBuilder(
          String(userOption.value),
          computerOption,
          matchResult
        ),
      });
    } else {
      await interaction.followUp({
        ephemeral: true,
        content:
          "`" +
          userOption.value +
          "` is not a valid option! Please choose either `rock`, `paper`, or `scissor`!",
      });
    }
  },
};
