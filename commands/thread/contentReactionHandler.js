import { ThreadAutoArchiveDuration } from 'discord.js';
import configJson from '../../config.json' assert { type: 'json' };

const categoryId = configJson.categoryId;

export default async function handleContentReaction(reaction, user) {
    try {
        if (user.bot) return;
        const content = reaction.message.content;
        const userMention = `<@${user.id}>`;
        let newContent = content;
        switch (reaction.emoji.name) {
            case '🟦':
                if (/Tank:(?!\s*<@\d+>)/.test(content)) {
                    newContent = content.replace(/Tank:(?!\s*<@\d+>)/, `Tank: ${userMention}`);
                }
                else {
                    await reaction.message.reply({ content: `No empty slots for Tank! Try other role ${userMention}` });
                }
                break;
            case '🟥':
                if (/DPS:(?!\s*<@\d+>)/.test(content)) {
                    newContent = content.replace(/DPS:(?!\s*<@\d+>)/, `DPS: ${userMention}`);
                }
                else {
                    await reaction.message.reply({ content: `No empty slots for DPS! Try other role ${userMention}` });
                }
                break;
            case '🟩':
                if (/Heal:(?!\s*<@\d+>)/.test(content)) {
                    newContent = content.replace(/Heal:(?!\s*<@\d+>)/, `Heal: ${userMention}`);
                }
                else {
                    await reaction.message.reply({ content: `No empty slots for Heal! Try other role ${userMention}` });
                }
                break;
        }
        if (newContent !== content) {
            await reaction.message.edit({ content: newContent });
        }
    }
    catch (e) {
        console.log(e);
    }
}

export async function handleContentReactionRemove(reaction, user) {
    try {
        if (user.bot) return;
        const content = reaction.message.content;
        const userMention = `<@${user.id}>`;
        let newContent = content;
        switch (reaction.emoji.name) {
            case '🟦':
                newContent = content.replace(new RegExp(`(Tank:)\\s*${userMention}`), 'Tank:');
                break;
            case '🟥':
                newContent = content.replace(new RegExp(`(DPS:)\\s*${userMention}`), 'DPS:');
                break;
            case '🟩':
                newContent = content.replace(new RegExp(`(Heal:)\\s*${userMention}`), 'Heal:');
                break;
        }
        if (newContent !== content) {
            await reaction.message.edit({ content: newContent });
        }
    } catch (e) {
        console.log(e);
    }
}

export { handleContentReaction };

