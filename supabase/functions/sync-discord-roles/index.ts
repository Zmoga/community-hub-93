import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============================================
// ROLE CONFIG — keep in sync with src/config/server.config.ts
// ============================================
const DISCORD_CONFIG = {
  ROLES_ORDER: ['owner','developer','team_lead','main_admin','admin','moderator','member'],
  ROLE_IDS: {
    'Discord.Owner': 'owner',
    'Discord.Developer': 'developer',
    'Discord.TeamLead': 'team_lead',
    'Discord.MainAdmin': 'main_admin',
    'Discord.Admin': 'admin',
    'Discord.Moderator': 'moderator',
    'Discord.Player': 'member',
  } as Record<string, string>,
  ADMIN_ROLES: ['owner','developer','team_lead','main_admin','admin','moderator'],
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get user from token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Discord ID from user metadata
    const discordId = user.user_metadata?.provider_id || user.user_metadata?.sub;
    
    if (!discordId) {
      return new Response(
        JSON.stringify({ error: 'No Discord ID found', roles: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's current roles from database
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (rolesError) {
      console.error('Error fetching roles:', rolesError);
    }

    // Update profile with Discord info
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        discord_id: discordId,
        discord_username: user.user_metadata?.full_name || user.user_metadata?.name,
        discord_avatar: user.user_metadata?.avatar_url,
        email: user.email,
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error('Error updating profile:', profileError);
    }

    // Get roles and sort them by display order
    const roles = userRoles?.map(r => r.role) || [];
    const sortedRoles = DISCORD_CONFIG.ROLES_ORDER.filter(role => 
      roles.includes(role as any)
    );

    // Check if user has admin access
    const isAdmin = roles.some(r => 
      DISCORD_CONFIG.ADMIN_ROLES.includes(r as string)
    );

    // Get highest role
    const highestRole = sortedRoles.length > 0 ? sortedRoles[0] : null;

    return new Response(
      JSON.stringify({
        success: true,
        discordId,
        roles: sortedRoles,
        highestRole,
        isAdmin,
        config: {
          rolesOrder: DISCORD_CONFIG.ROLES_ORDER,
          adminRoles: DISCORD_CONFIG.ADMIN_ROLES,
        },
        profile: {
          discord_username: user.user_metadata?.full_name,
          discord_avatar: user.user_metadata?.avatar_url,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error syncing Discord roles:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
