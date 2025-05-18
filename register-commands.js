import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'url';

const __dirname = path.resolve();


import configJson from "./config.json" assert { type: "json" };
const token = configJson.token;
const clientId = configJson.clientId;

const registerCommands = async () => {
    const commands = new Map();

    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandPath, file);
            const command = await import(pathToFileURL(filePath).href);

            if ('data' in command.default && 'execute' in command.default) {
                commands.set(command.default.data.name, command);
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    const rest = new REST().setToken(token);

    (async () => {
        try {
            console.log(`Started refreshing ${commands.size} application (/) commands.`);

            const data  = await rest.put(
                Routes.applicationCommands(clientId),
                { body: Array.from(commands.values()).map(cmd => cmd.default.data.toJSON()) },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        }
        catch (error) {
            console.error(error);
        }
    })();
    return commands;
};

export { registerCommands };