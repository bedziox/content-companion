import { ThreadAutoArchiveDuration } from 'discord.js';
import configJson from '../../config.json' assert { type: 'json' };

const categoryId = configJson.categoryId;

export default async function handleContentReaction(reaction, user) {
    try {
        if (user.bot) return;
        const content = reaction.message.content;
        const userMention = `<@${user.id}>`;
        const tankRegex = /Tank:(?!\s*<@\d+>)/;
        const dpsRegex = /DPS:(?!\s*<@\d+>)/;
        const healRegex = /Heal:(?!\s*<@\d+>)/;
        switch (reaction.emoji.name) {
            case '🟦':
                if (tankRegex.test(content)) {
                    const newContent = content.replace(tankRegex, `Tank: ${userMention}`);
                    await reaction.message.edit({ content: newContent });
                }
                break;
            case '🟥':
                if (tankRegex.test(content)) {
                    const newContent = content.replace(dpsRegex, `DPS: ${userMention}`);
                    await reaction.message.edit({ content: newContent });
                }
                break;
            case '🟩':
                if (tankRegex.test(content)) {
                    const newContent = content.replace(healRegex, `Heal: ${userMention}`);
                    await reaction.message.edit({ content: newContent });
                }
                break;
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

