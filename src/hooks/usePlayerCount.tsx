import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FIVEM_CONFIG } from '@/config/server.config';

interface PlayerCountData {
  players: number;
  maxPlayers: number;
  online: boolean;
  serverName?: string;
  error?: string;
}

export function usePlayerCount(
  serverIp: string = FIVEM_CONFIG.SERVER_CODE,
  refreshInterval: number = FIVEM_CONFIG.REFRESH_INTERVAL
) {
  const [data, setData] = useState<PlayerCountData>({
    players: 0,
    maxPlayers: FIVEM_CONFIG.DEFAULT_MAX_PLAYERS,
    online: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchPlayerCount = async () => {
    try {
      const response = await supabase.functions.invoke('get-player-count', {
        body: { serverIp },
      });

      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching player count:', error);
      setData(prev => ({ ...prev, online: false }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerCount();
    const id = setInterval(fetchPlayerCount, refreshInterval);
    return () => clearInterval(id);
  }, [serverIp, refreshInterval]);

  return { ...data, loading, refetch: fetchPlayerCount };
}
