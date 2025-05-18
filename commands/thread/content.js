import { SlashCommandBuilder, GuildTextThreadManager, ForumChannel, ChannelManager, Guild, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('content')
        .setDescription('Creates content thread'),
    async execute(interaction) {
        try {
            console.log(`Modal created for ${interaction.user} from ${interaction.guild.name}`);
            const modal = new ModalBuilder()
                .setCustomId('content-builder')
                .setTitle('Create content');
            const dpsInput = new TextInputBuilder()
                .setCustomId('dpsInput')
                .setLabel('DPS number')
                .setStyle(TextInputStyle.Short);
            const tankInput = new TextInputBuilder()
                .setCustomId('tankInput')
                .setLabel('Tank number')
                .setStyle(TextInputStyle.Short);
            const healInput = new TextInputBuilder()
                .setCustomId('healInput')
                .setLabel('Heal number')
                .setStyle(TextInputStyle.Short);
            const contentNameInput = new TextInputBuilder()
                .setCustomId('contentNameInput')
                .setLabel('Content name')
                .setStyle(TextInputStyle.Short);
            const descriptionInput = new TextInputBuilder()
                .setCustomId('descriptionInput')
                .setLabel('Description of content with date')
                .setStyle(TextInputStyle.Paragraph);
            
            const firstActionRow = new ActionRowBuilder().addComponents(dpsInput);
            const secondActionRow = new ActionRowBuilder().addComponents(tankInput);
            const thirdActionRow = new ActionRowBuilder().addComponents(healInput);
            const forthActionRow = new ActionRowBuilder().addComponents(contentNameInput);
            const fifthActionRow = new ActionRowBuilder().addComponents(descriptionInput);

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, forthActionRow, fifthActionRow);

            await interaction.showModal(modal);
        }
        catch (e) {
            console.log(e);
        }
    },
};