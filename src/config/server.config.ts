/**
 * ====================================================
 * MAIN SERVER CONFIGURATION
 * ====================================================
 * Edit this single file to configure:
 *  - FiveM Server connection & player count
 *  - Discord OAuth & login settings
 *  - Role hierarchy, IDs, permissions & display
 *  - Admin panel access rules
 * ====================================================
 */

// ============================================
// 1. FIVEM SERVER
// ============================================
export const FIVEM_CONFIG = {
  /** cfx.re server code (the part after cfx.re/join/) */
  SERVER_CODE: 'norulespvp',

  /** Connect string shown to users */
  CONNECT_STRING: 'connect cfx.re/join/norulespvp',

  /** How often to refresh player count (ms) */
  REFRESH_INTERVAL: 30_000,

  /** Default max players shown while loading */
  DEFAULT_MAX_PLAYERS: 128,
};

// ============================================
// 2. DISCORD / AUTH
// ============================================
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

// ============================================
// 3. ROLE HIERARCHY (highest → lowest)
// ============================================
export const ROLES_ORDER = [
  'owner',
  'team_lead',
  'main_admin',
  'admin',
  'developer',
  'moderator',
  'member',
] as const;

export type AppRole = typeof ROLES_ORDER[number];

// ============================================
// 4. DISCORD ROLE IDS
// Replace with your actual Discord role IDs
// ============================================
export const DISCORD_ROLE_IDS: Record<AppRole, string> = {
  owner: '477',
  team_lead: '478',
  main_admin: '479',
  admin: '480',
  developer: '481',
  moderator: '482',
  member: '483',
};

/** Reverse mapping: Discord ID → App Role */
export const DISCORD_ID_TO_ROLE: Record<string, AppRole> = Object.entries(
  DISCORD_ROLE_IDS
).reduce((acc, [role, id]) => {
  acc[id] = role as AppRole;
  return acc;
}, {} as Record<string, AppRole>);

// ============================================
// 5. ROLE DISPLAY (badges, colors, icons)
// ============================================
export const ROLE_DISPLAY: Record<AppRole, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}> = {
  owner: {
    label: 'Owner',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/50',
    icon: '👑',
  },
  team_lead: {
    label: 'Team Lead',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
    icon: '⭐',
  },
  main_admin: {
    label: 'Main Admin',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
    icon: '🛡️',
  },
  admin: {
    label: 'Admin',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/50',
    icon: '⚔️',
  },
  developer: {
    label: 'Developer',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
    icon: '💻',
  },
  moderator: {
    label: 'Moderator',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
    icon: '🔧',
  },
  member: {
    label: 'Member',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/50',
    icon: '👤',
  },
};

// ============================================
// 6. ROLE PERMISSIONS
// ============================================
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
  owner: {
    canAccessAdmin: true, canBanPlayers: true, canKickPlayers: true,
    canWarnPlayers: true, canManageRoles: true, canViewLogs: true,
    canManageServer: true, canEditConfig: true,
  },
  team_lead: {
    canAccessAdmin: true, canBanPlayers: true, canKickPlayers: true,
    canWarnPlayers: true, canManageRoles: true, canViewLogs: true,
    canManageServer: true, canEditConfig: false,
  },
  main_admin: {
    canAccessAdmin: true, canBanPlayers: true, canKickPlayers: true,
    canWarnPlayers: true, canManageRoles: false, canViewLogs: true,
    canManageServer: false, canEditConfig: false,
  },
  admin: {
    canAccessAdmin: true, canBanPlayers: true, canKickPlayers: true,
    canWarnPlayers: true, canManageRoles: false, canViewLogs: true,
    canManageServer: false, canEditConfig: false,
  },
  developer: {
    canAccessAdmin: true, canBanPlayers: false, canKickPlayers: false,
    canWarnPlayers: false, canManageRoles: false, canViewLogs: true,
    canManageServer: true, canEditConfig: true,
  },
  moderator: {
    canAccessAdmin: true, canBanPlayers: false, canKickPlayers: true,
    canWarnPlayers: true, canManageRoles: false, canViewLogs: true,
    canManageServer: false, canEditConfig: false,
  },
  member: {
    canAccessAdmin: false, canBanPlayers: false, canKickPlayers: false,
    canWarnPlayers: false, canManageRoles: false, canViewLogs: false,
    canManageServer: false, canEditConfig: false,
  },
};

// ============================================
// 7. HELPER FUNCTIONS
// ============================================

export function sortRolesByOrder(roles: string[]): AppRole[] {
  return ROLES_ORDER.filter(role => roles.includes(role));
}

export function getHighestRole(roles: string[]): AppRole | null {
  const sorted = sortRolesByOrder(roles);
  return sorted.length > 0 ? sorted[0] : null;
}

export function hasAdminAccess(roles: string[]): boolean {
  return roles.some(role =>
    ROLE_PERMISSIONS[role as AppRole]?.canAccessAdmin ?? false
  );
}

export function hasPermission(
  roles: string[],
  permission: keyof typeof ROLE_PERMISSIONS[AppRole]
): boolean {
  return roles.some(role =>
    ROLE_PERMISSIONS[role as AppRole]?.[permission] ?? false
  );
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
