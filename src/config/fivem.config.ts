/**
 * FiveM Server Configuration
 * Edit this file to configure your FiveM server connection & player count.
 */

export const FIVEM_CONFIG = {
  /** cfx.re server code (the part after cfx.re/join/) */
  SERVER_CODE: 'norulespvp',

  /** Connect string shown to users (copy-to-clipboard) */
  CONNECT_STRING: 'connect cfx.re/join/norulespvp',

  /** Direct connect URL — opens FiveM client */
  CONNECT_URL: 'fivem://connect/cfx.re/join/norulespvp',

  /** How often to refresh player count (ms) */
  REFRESH_INTERVAL: 30_000,

  /** Default max players shown while loading */
  DEFAULT_MAX_PLAYERS: 128,
};
