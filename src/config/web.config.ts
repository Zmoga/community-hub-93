/**
 * ====================================================
 * WEB / PANEL CONFIG — UI Display, Badges, Theming
 * ====================================================
 */

import type { AppRole } from './fivem.config';

// ── Role Display (badges, colors, icons) ──
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

// ── Web Panel Settings ──
export const WEB_CONFIG = {
  SITE_NAME: 'NoRulesPVP',
  SITE_DESCRIPTION: 'The ultimate FiveM PVP experience with no rules.',
  THEME: 'dark' as const,
};
