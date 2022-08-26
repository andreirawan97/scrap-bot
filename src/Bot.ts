import { Client } from "discord.js";

import { BOT_TOKEN } from "./configs/secret";
import { onReady, onInteractionCreate } from "./listeners";

console.log("Bot is starting... 🔧");

const client = new Client({
  intents: [],
});

onReady(client);
onInteractionCreate(client);

client.login(BOT_TOKEN);
