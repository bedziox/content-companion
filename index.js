import  { Client, Events, GatewayIntentBits, MessageFlags, Partials } from 'discord.js';
import { registerCommands } from './register-commands.js';
import { handleContentSubmit } from './commands/thread/contentModalHandler.js'
import { handleContentReaction, handleContentReactionRemove} from './commands/thread/contentReactionHandler.js'

import configJson from "./config.json" assert { type: "json" };
const token = configJson.token;

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);

const commands = await registerCommands();

client.on(Events.InteractionCreate, async interaction => {
    try {
        if (interaction.isChatInputCommand()) {
            const command = commands.get(interaction.commandName).default;
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            await command.execute(interaction);
        }
        else if (interaction.isModalSubmit()) {
            switch (interaction.customId) {
                case "content-builder":
                    await handleContentSubmit(interaction);
                    break;
                default:
                    interaction.reply("No handler matching this modal");
                    break;
            }
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

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
    }
    handleContentReaction(reaction, user);
    console.log(`${user} reacted (${reaction.emoji.name}) to message ${reaction.message.id}`);
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (reaction.partial) {
        try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
    }
    handleContentReactionRemove(reaction, user);
    console.log(`${user} removed his reaction (${reaction.emoji.name}) from message ${reaction.message.id}`);

})