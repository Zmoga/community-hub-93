import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PlayerCountData {
  players: number;
  maxPlayers: number;
  online: boolean;
  serverName?: string;
  error?: string;
}

export function usePlayerCount(serverIp: string, refreshInterval = 30000) {
  const [data, setData] = useState<PlayerCountData>({
    players: 0,
    maxPlayers: 128,
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
    
    const interval = setInterval(fetchPlayerCount, refreshInterval);
    
    return () => clearInterval(interval);
  }, [serverIp, refreshInterval]);

  return { ...data, loading, refetch: fetchPlayerCount };
}
