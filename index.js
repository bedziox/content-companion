import  { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { registerCommands } from './register-commands.js';
import { handleContentSubmit} from './commands/thread/contentModalHandle.js'

import configJson from "./config.json" assert { type: "json" };
const token = configJson.token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);

const commands = await registerCommands();

client.on(Events.InteractionCreate, async interaction => {
    try {
        if (interaction.isChatInputCommand())
        {
            const command = commands.get(interaction.commandName).default;
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            await command.execute(interaction);
        }
        else if (interaction.isModalSubmit()) {
            if(interaction.customId === "content-builder")
                await handleContentSubmit(interaction);
        }
            
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
    }
});