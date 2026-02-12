/**
 * Role Permissions & Helper Functions
 * Edit this file to configure what each role can do.
 */

import { ROLES_ORDER, type AppRole } from './roles.config';

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
    canAccessAdmin: true, canBanPlayers: true, canKickPlayers: true,
    canWarnPlayers: true, canManageRoles: true, canViewLogs: true,
    canManageServer: true, canEditConfig: true,
  },
  developer: {
    canAccessAdmin: true, canBanPlayers: false, canKickPlayers: false,
    canWarnPlayers: false, canManageRoles: false, canViewLogs: true,
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
// HELPER FUNCTIONS
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
