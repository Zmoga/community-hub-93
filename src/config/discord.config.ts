/**
 * Discord Role Configuration
 * 
 * This config maps Discord role IDs to application roles and defines the display order.
 * To add new roles:
 * 1. Add the role name to ROLES_ORDER array (determines display priority)
 * 2. Add the Discord role ID to DISCORD_ROLE_IDS object
 * 3. Define permissions in ROLE_PERMISSIONS
 */

// ============================================
// ROLE DISPLAY ORDER (highest to lowest rank)
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
// DISCORD ROLE IDS
// Replace these with your actual Discord role IDs
// ============================================
export const DISCORD_ROLE_IDS: Record<AppRole, string> = {
  owner: '477',           // Owner role ID
  team_lead: '478',       // Team Lead role ID
  main_admin: '479',      // Main Admin role ID
  admin: '480',           // Admin role ID
  developer: '481',       // Developer role ID
  moderator: '482',       // Moderator role ID
  member: '483',          // Member role ID
};

// Reverse mapping: Discord ID -> App Role
export const DISCORD_ID_TO_ROLE: Record<string, AppRole> = Object.entries(
  DISCORD_ROLE_IDS
).reduce((acc, [role, id]) => {
  acc[id] = role as AppRole;
  return acc;
}, {} as Record<string, AppRole>);

// ============================================
// ROLE DISPLAY CONFIGURATION
// ============================================
export const ROLE_DISPLAY: Record<AppRole, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon?: string;
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
// ROLE PERMISSIONS
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
    canAccessAdmin: true,
    canBanPlayers: true,
    canKickPlayers: true,
    canWarnPlayers: true,
    canManageRoles: true,
    canViewLogs: true,
    canManageServer: true,
    canEditConfig: true,
  },
  team_lead: {
    canAccessAdmin: true,
    canBanPlayers: true,
    canKickPlayers: true,
    canWarnPlayers: true,
    canManageRoles: true,
    canViewLogs: true,
    canManageServer: true,
    canEditConfig: false,
  },
  main_admin: {
    canAccessAdmin: true,
    canBanPlayers: true,
    canKickPlayers: true,
    canWarnPlayers: true,
    canManageRoles: false,
    canViewLogs: true,
    canManageServer: false,
    canEditConfig: false,
  },
  admin: {
    canAccessAdmin: true,
    canBanPlayers: true,
    canKickPlayers: true,
    canWarnPlayers: true,
    canManageRoles: false,
    canViewLogs: true,
    canManageServer: false,
    canEditConfig: false,
  },
  developer: {
    canAccessAdmin: true,
    canBanPlayers: false,
    canKickPlayers: false,
    canWarnPlayers: false,
    canManageRoles: false,
    canViewLogs: true,
    canManageServer: true,
    canEditConfig: true,
  },
  moderator: {
    canAccessAdmin: true,
    canBanPlayers: false,
    canKickPlayers: true,
    canWarnPlayers: true,
    canManageRoles: false,
    canViewLogs: true,
    canManageServer: false,
    canEditConfig: false,
  },
  member: {
    canAccessAdmin: false,
    canBanPlayers: false,
    canKickPlayers: false,
    canWarnPlayers: false,
    canManageRoles: false,
    canViewLogs: false,
    canManageServer: false,
    canEditConfig: false,
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get sorted roles by their display order
 */
export function sortRolesByOrder(roles: string[]): AppRole[] {
  return ROLES_ORDER.filter(role => roles.includes(role));
}

/**
 * Get the highest role from a list of roles
 */
export function getHighestRole(roles: string[]): AppRole | null {
  const sorted = sortRolesByOrder(roles);
  return sorted.length > 0 ? sorted[0] : null;
}

/**
 * Check if user has admin access (any role that can access admin panel)
 */
export function hasAdminAccess(roles: string[]): boolean {
  return roles.some(role => 
    ROLE_PERMISSIONS[role as AppRole]?.canAccessAdmin ?? false
  );
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(
  roles: string[], 
  permission: keyof typeof ROLE_PERMISSIONS[AppRole]
): boolean {
  return roles.some(role => 
    ROLE_PERMISSIONS[role as AppRole]?.[permission] ?? false
  );
}

/**
 * Get all permissions for a set of roles (combines permissions from all roles)
 */
export function getPermissions(roles: string[]) {
  const defaultPerms = {
    canAccessAdmin: false,
    canBanPlayers: false,
    canKickPlayers: false,
    canWarnPlayers: false,
    canManageRoles: false,
    canViewLogs: false,
    canManageServer: false,
    canEditConfig: false,
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

// ============================================
// DISCORD SERVER CONFIG
// ============================================
export const DISCORD_CONFIG = {
  // Your Discord server (guild) ID
  GUILD_ID: 'YOUR_DISCORD_SERVER_ID',
  
  // Discord invite link
  INVITE_URL: 'https://discord.gg/norulespvp',
  
  // OAuth scopes needed
  OAUTH_SCOPES: ['identify', 'guilds', 'guilds.members.read'],
};
