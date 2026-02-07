import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
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

    // FiveM server info endpoint
    const fivemUrl = `https://servers-frontend.fivem.net/api/servers/single/${serverIp}`;
    
    const response = await fetch(fivemUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      // Try alternative cfx.re API
      const cfxUrl = `https://servers-frontend.fivem.net/api/servers/single/${serverIp}`;
      const cfxResponse = await fetch(cfxUrl);
      
      if (!cfxResponse.ok) {
        return new Response(
          JSON.stringify({ 
            players: 0, 
            maxPlayers: 128, 
            online: false,
            error: 'Server not found' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const cfxData = await cfxResponse.json();
      return new Response(
        JSON.stringify({
          players: cfxData.Data?.clients || 0,
          maxPlayers: cfxData.Data?.sv_maxclients || 128,
          online: true,
          serverName: cfxData.Data?.hostname || 'Unknown',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        players: data.Data?.clients || 0,
        maxPlayers: data.Data?.sv_maxclients || 128,
        online: true,
        serverName: data.Data?.hostname || 'Unknown',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching player count:', error);
    return new Response(
      JSON.stringify({ 
        players: 0, 
        maxPlayers: 128, 
        online: false,
        error: 'Failed to fetch server info' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
