/**
 * Discord / Auth Configuration
 * Edit this file to configure Discord OAuth and server settings.
 */

export const DISCORD_AUTH_CONFIG = {
  /** Your Discord server (guild) ID */
  GUILD_ID: 'YOUR_DISCORD_SERVER_ID',

  /** Public invite link */
  INVITE_URL: 'https://discord.gg/norulespvp',

  /** OAuth scopes needed for login */
  OAUTH_SCOPES: ['identify', 'guilds', 'guilds.members.read'],

  /** Where to redirect after login */
  REDIRECT_PATH: '/admin',
};
