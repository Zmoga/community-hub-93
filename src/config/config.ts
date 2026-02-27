/**
 * ╔══════════════════════════════════════════════════════╗
 * ║          MASTER CONFIG — Single Source of Truth       ║
 * ╠══════════════════════════════════════════════════════╣
 * ║  § 1  FiveM Server                                    ║
 * ║  § 2  Discord / Auth                                  ║
 * ║  § 3  Roles & Permissions                             ║
 * ║  § 4  Analytics & Stats                               ║
 * ║  § 5  Web / Panel UI                                  ║
 * ║  § 6  Helper Functions                                ║
 * ╚══════════════════════════════════════════════════════╝
 *  Import from: '@/config/config'
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 1. FIVEM SERVER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const FIVEM_CONFIG = {
  SERVER_CODE: 'norulespvp',
  CONNECT_STRING: 'connect cfx.re/join/norulespvp',
  CONNECT_URL: 'fivem://connect/cfx.re/join/norulespvp',
  REFRESH_INTERVAL: 30_000,
  DEFAULT_MAX_PLAYERS: 128,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 2. DISCORD / AUTH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const DISCORD_AUTH_CONFIG = {
  GUILD_ID: 'YOUR_DISCORD_SERVER_ID',
  INVITE_URL: 'https://discord.gg/norulespvp',
  OAUTH_SCOPES: ['identify', 'guilds', 'guilds.members.read'],
  REDIRECT_PATH: '/admin',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 3. ROLES & PERMISSIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ROLES_ORDER = [
  'owner', 'developer', 'team_lead', 'main_admin', 'admin', 'moderator', 'member',
] as const;

export type AppRole = typeof ROLES_ORDER[number];

export const DISCORD_ROLE_IDS: Record<AppRole, string> = {
  owner: 'Discord.Owner',
  developer: 'Discord.Developer',
  team_lead: 'Discord.TeamLead',
  main_admin: 'Discord.MainAdmin',
  admin: 'Discord.Admin',
  moderator: 'Discord.Moderator',
  member: 'Discord.Player',
};

export const DISCORD_ID_TO_ROLE: Record<string, AppRole> = Object.entries(
  DISCORD_ROLE_IDS
).reduce((acc, [role, id]) => {
  acc[id] = role as AppRole;
  return acc;
}, {} as Record<string, AppRole>);

export const ROLE_PERMISSIONS: Record<AppRole, {
  canAccessAdmin: boolean;
  canBanPlayers: boolean;
  canKickPlayers: boolean;
  canWarnPlayers: boolean;
  canManageRoles: boolean;
  canViewLogs: boolean;
  canManageServer: boolean;
  canEditConfig: boolean;
}> = {
  owner:      { canAccessAdmin: true,  canBanPlayers: true,  canKickPlayers: true,  canWarnPlayers: true,  canManageRoles: true,  canViewLogs: true,  canManageServer: true,  canEditConfig: true  },
  developer:  { canAccessAdmin: true,  canBanPlayers: false, canKickPlayers: false, canWarnPlayers: false, canManageRoles: false, canViewLogs: true,  canManageServer: true,  canEditConfig: true  },
  team_lead:  { canAccessAdmin: true,  canBanPlayers: true,  canKickPlayers: true,  canWarnPlayers: true,  canManageRoles: true,  canViewLogs: true,  canManageServer: true,  canEditConfig: false },
  main_admin: { canAccessAdmin: true,  canBanPlayers: true,  canKickPlayers: true,  canWarnPlayers: true,  canManageRoles: false, canViewLogs: true,  canManageServer: false, canEditConfig: false },
  admin:      { canAccessAdmin: true,  canBanPlayers: true,  canKickPlayers: true,  canWarnPlayers: true,  canManageRoles: false, canViewLogs: true,  canManageServer: false, canEditConfig: false },
  moderator:  { canAccessAdmin: true,  canBanPlayers: false, canKickPlayers: true,  canWarnPlayers: true,  canManageRoles: false, canViewLogs: true,  canManageServer: false, canEditConfig: false },
  member:     { canAccessAdmin: false, canBanPlayers: false, canKickPlayers: false, canWarnPlayers: false, canManageRoles: false, canViewLogs: false, canManageServer: false, canEditConfig: false },
};

export const ROLE_DISPLAY: Record<AppRole, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}> = {
  owner:      { label: 'Owner',      color: 'text-red-400',    bgColor: 'bg-red-500/20',    borderColor: 'border-red-500/50',    icon: '👑' },
  developer:  { label: 'Developer',  color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/50', icon: '💻' },
  team_lead:  { label: 'Team Lead',  color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/50', icon: '⭐' },
  main_admin: { label: 'Main Admin', color: 'text-amber-400',  bgColor: 'bg-amber-500/20',  borderColor: 'border-amber-500/50',  icon: '🛡️' },
  admin:      { label: 'Admin',      color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/50', icon: '⚔️' },
  moderator:  { label: 'Moderator',  color: 'text-blue-400',   bgColor: 'bg-blue-500/20',   borderColor: 'border-blue-500/50',   icon: '🔧' },
  member:     { label: 'Player',     color: 'text-gray-400',   bgColor: 'bg-gray-500/20',   borderColor: 'border-gray-500/50',   icon: '👤' },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 4. ANALYTICS & STATS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ANALYTICS_CONFIG = {
  /** How often the cron snapshots player count (minutes) */
  SNAPSHOT_INTERVAL_MINS: 5,
  /** Days of history to show in the stats section */
  HISTORY_DAYS: 30,
  /** Table name for server snapshots */
  TABLE: 'server_stats',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 5. WEB / PANEL UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const WEB_CONFIG = {
  SITE_NAME: 'NoRulesPVP',
  SITE_DESCRIPTION: 'The ultimate FiveM PVP experience with no rules.',
  THEME: 'dark' as const,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § 6. HELPER FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function sortRolesByOrder(roles: string[]): AppRole[] {
  return ROLES_ORDER.filter(role => roles.includes(role));
}

export function getHighestRole(roles: string[]): AppRole | null {
  const sorted = sortRolesByOrder(roles);
  return sorted.length > 0 ? sorted[0] : null;
}

export function hasAdminAccess(roles: string[]): boolean {
  return roles.some(role => ROLE_PERMISSIONS[role as AppRole]?.canAccessAdmin ?? false);
}

export function hasPermission(roles: string[], permission: keyof typeof ROLE_PERMISSIONS[AppRole]): boolean {
  return roles.some(role => ROLE_PERMISSIONS[role as AppRole]?.[permission] ?? false);
}

export function getPermissions(roles: string[]) {
  const defaultPerms = {
    canAccessAdmin: false, canBanPlayers: false, canKickPlayers: false,
    canWarnPlayers: false, canManageRoles: false, canViewLogs: false,
    canManageServer: false, canEditConfig: false,
  };
  return roles.reduce((perms, role) => {
    const rolePerms = ROLE_PERMISSIONS[role as AppRole];
    if (rolePerms) {
      Object.keys(perms).forEach(key => {
        const k = key as keyof typeof perms;
        perms[k] = perms[k] || rolePerms[k];
      });
    }
    return perms;
  }, defaultPerms);
}
