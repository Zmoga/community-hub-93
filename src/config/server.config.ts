/**
 * ====================================================
 * MAIN SERVER CONFIGURATION — Barrel Export
 * ====================================================
 * All config is split into focused files:
 *   - fivem.config.ts    → FiveM server & player count
 *   - discord.config.ts  → Discord OAuth & login
 *   - roles.config.ts    → Role hierarchy, IDs & display
 *   - permissions.config.ts → Permissions & helpers
 *
 * Import from this file OR from individual configs.
 * ====================================================
 */

export { FIVEM_CONFIG } from './fivem.config';
export { DISCORD_AUTH_CONFIG } from './discord.config';
export {
  ROLES_ORDER,
  type AppRole,
  DISCORD_ROLE_IDS,
  DISCORD_ID_TO_ROLE,
  ROLE_DISPLAY,
} from './roles.config';
export {
  ROLE_PERMISSIONS,
  sortRolesByOrder,
  getHighestRole,
  hasAdminAccess,
  hasPermission,
  getPermissions,
} from './permissions.config';
