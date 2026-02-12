/**
 * Role Hierarchy, Display & Discord ID Mapping
 * Edit this file to configure roles, their order, appearance, and Discord IDs.
 */

// ============================================
// 1. ROLE HIERARCHY (highest → lowest)
// ============================================
export const ROLES_ORDER = [
  'owner',
  'developer',
  'team_lead',
  'main_admin',
  'admin',
  'moderator',
  'member',
] as const;

export type AppRole = typeof ROLES_ORDER[number];

// ============================================
// 2. DISCORD ROLE IDS
// Format: Discord.<RoleName> — replace with your real Discord role IDs
// ============================================
export const DISCORD_ROLE_IDS: Record<AppRole, string> = {
  owner: 'Discord.Owner',
  developer: 'Discord.Developer',
  team_lead: 'Discord.TeamLead',
  main_admin: 'Discord.MainAdmin',
  admin: 'Discord.Admin',
  moderator: 'Discord.Moderator',
  member: 'Discord.Player',
};

/** Reverse mapping: Discord ID → App Role */
export const DISCORD_ID_TO_ROLE: Record<string, AppRole> = Object.entries(
  DISCORD_ROLE_IDS
).reduce((acc, [role, id]) => {
  acc[id] = role as AppRole;
  return acc;
}, {} as Record<string, AppRole>);

// ============================================
// 3. ROLE DISPLAY (badges, colors, icons)
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
  developer: {
    label: 'Developer',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
    icon: '💻',
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
  moderator: {
    label: 'Moderator',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
    icon: '🔧',
  },
  member: {
    label: 'Player',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/50',
    icon: '👤',
  },
};
