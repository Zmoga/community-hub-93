import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { serverIp } = await req.json();

    if (!serverIp) {
      return new Response(
        JSON.stringify({ error: 'Server IP is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch from FiveM API
    const fivemUrl = `https://servers-frontend.fivem.net/api/servers/single/${serverIp}`;
    let players = 0;
    let maxPlayers = 128;
    let online = false;
    let serverName = 'Unknown';

    try {
      const response = await fetch(fivemUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      });

      if (response.ok) {
        const data = await response.json();
        players = data.Data?.clients || 0;
        maxPlayers = data.Data?.sv_maxclients || 128;
        online = true;
        serverName = data.Data?.hostname || 'Unknown';
      }
    } catch (fetchErr) {
      console.error('FiveM API fetch error:', fetchErr);
    }

    // Store snapshot in database
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      await supabase.from('server_stats').insert({
        players,
        max_players: maxPlayers,
        online,
        server_name: serverName,
      });
    } catch (dbErr) {
      console.error('DB insert error:', dbErr);
    }

    return new Response(
      JSON.stringify({ players, maxPlayers, online, serverName }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching player count:', error);
    return new Response(
      JSON.stringify({ players: 0, maxPlayers: 128, online: false, error: 'Failed to fetch server info' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
