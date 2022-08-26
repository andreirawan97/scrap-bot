import { Command } from "../types/Command";

import { Hello } from "./hello";
import { RockPaperScissor } from "./rockPaperScissor";
import { WhoAmI } from "./whoami";
import { Pokedex } from "./pokedex";

export const commands: Command[] = [Hello, WhoAmI, RockPaperScissor, Pokedex];
