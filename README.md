# Content Companion Discord Bot

A Discord bot for managing content creation for Albion Online on discord server.

## Features

- Slash command `/content` to create a new content thread in a forum channel.
- Modal dialog for users to specify DPS, Tank, Heal numbers, content name, and description.
- Automatically creates a thread with formatted slots for DPS, Tank, and Heal in specified Forum.
- Users can claim roles by reacting to the thread's starter message:
  - 🟦 for Tank
  - 🟥 for DPS
  - 🟩 for Heal
- Removing a reaction removes the user's mention from the slot.
- Only non-bot users are processed for reactions.

## Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure your bot:**

   - Edit `config.json` with your bot token, clientId, guildId, and forum channel ID (categoryId).

## Notes

- The bot expects a Discord forum channel for thread creation (not a text or category channel).
- Only the first empty slot for each role is filled per user reaction.
- The bot ignores reactions from bots (including itself).

## License

MIT
