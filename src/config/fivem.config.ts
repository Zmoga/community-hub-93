/**
 * ====================================================
 * FIVEM SERVER CONFIG — Connection, Roles, Permissions
 * ====================================================
 */

// ── FiveM Server ──
export const FIVEM_CONFIG = {
  SERVER_CODE: 'norulespvp',
  CONNECT_STRING: 'connect cfx.re/join/norulespvp',
  CONNECT_URL: 'fivem://connect/cfx.re/join/norulespvp',
  REFRESH_INTERVAL: 30_000,
  DEFAULT_MAX_PLAYERS: 128,
};

// ── Discord / Auth ──
export const DISCORD_AUTH_CONFIG = {
  GUILD_ID: 'YOUR_DISCORD_SERVER_ID',
  INVITE_URL: 'https://discord.gg/norulespvp',
  OAUTH_SCOPES: ['identify', 'guilds', 'guilds.members.read'],
  REDIRECT_PATH: '/admin',
};

// ── Role Hierarchy ──
export const ROLES_ORDER = [
  'owner', 'developer', 'team_lead', 'main_admin', 'admin', 'moderator', 'member',
] as const;

export type AppRole = typeof ROLES_ORDER[number];

// ── Discord Role IDs ──
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

// ── Permissions ──
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

// ── Helpers ──
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
