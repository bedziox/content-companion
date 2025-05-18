import { ThreadAutoArchiveDuration } from 'discord.js';
import configJson from '../../config.json' assert { type: 'json' };

const categoryId = configJson.categoryId;

export default async function handleContentSubmit(interaction) {
    try {
        console.log(`Modal submitted for ${interaction.user} from ${interaction.guild.name}`);
        const dps = interaction.fields.getTextInputValue('dpsInput');
        const tank = interaction.fields.getTextInputValue('tankInput');
        const heal = interaction.fields.getTextInputValue('healInput');
        const description = interaction.fields.getTextInputValue('descriptionInput');
        const name = interaction.fields.getTextInputValue('contentNameInput');
    
        const forumChannel = await interaction.guild.channels.fetch(categoryId);
        if (!forumChannel || forumChannel.type !== 15) { // 15 = GuildForum
            await interaction.reply({ content: 'Forum channel not found or is not a forum channel.'});
            return;
        }

        const dpsCount = Math.max(0, Math.min(20, Number(dps) || 0));
        const tankCount = Math.max(0, Math.min(20, Number(tank) || 0));
        const healCount = Math.max(0, Math.min(20, Number(heal) || 0));

        if (dpsCount === 0 || tankCount === 0 || healCount === 0) {
            await interaction.reply({ content: 'DPS, Tank and Healer fields should be numbers!' });
            return;
        }
    
        const dpsLines = Array(dpsCount).fill('DPS:').join('\n');
        const tankLines = Array(tankCount).fill('Tank:').join('\n');
        const healLines = Array(healCount).fill('Heal:').join('\n');
    
        const thread = await forumChannel.threads.create({
            name: name,
            message: {
                content: `Post author: ${interaction.user} \n**Description:** ${description}\n${dpsLines}\n${tankLines}\n${healLines} \n <@here>`
            },
            autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays
        })

        // Fetch the starter message of the thread
        const starterMessage = thread.messages ? await thread.messages.fetch(thread.id) : null;
        if (starterMessage) {
            await starterMessage.react('🟦'); // blue square
            await starterMessage.react('🟥'); // red square
            await starterMessage.react('🟩'); // green square
        }

        await interaction.reply({ content: 'Thread created!'});
    }
    catch (e) {
        console.log(e);
    }
}

export { handleContentSubmit };

