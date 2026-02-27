import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ANALYTICS_CONFIG } from '@/config/config';

export interface DailyStats {
  date: string;
  avg_players: number;
  peak_players: number;
  uptime_pct: number;
  total_snapshots: number;
  online_snapshots: number;
}

export function useServerStats(days: number = ANALYTICS_CONFIG.HISTORY_DAYS) {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const since = new Date();
        since.setDate(since.getDate() - days);

        const { data, error } = await supabase
          .from('server_stats')
          .select('recorded_at, players, online')
          .gte('recorded_at', since.toISOString())
          .order('recorded_at', { ascending: true });

        if (error) {
          console.error('Error fetching server stats:', error);
          setStats([]);
          return;
        }

        if (!data || data.length === 0) {
          setStats([]);
          return;
        }

        // Group by day
        const grouped: Record<string, { players: number[]; onlineCount: number; totalCount: number }> = {};

        for (const row of data) {
          const day = row.recorded_at.slice(0, 10); // YYYY-MM-DD
          if (!grouped[day]) grouped[day] = { players: [], onlineCount: 0, totalCount: 0 };
          grouped[day].players.push(row.players);
          grouped[day].totalCount++;
          if (row.online) grouped[day].onlineCount++;
        }

        const dailyStats: DailyStats[] = Object.entries(grouped).map(([date, g]) => ({
          date,
          avg_players: Math.round(g.players.reduce((a, b) => a + b, 0) / g.players.length),
          peak_players: Math.max(...g.players),
          uptime_pct: g.totalCount > 0 ? Math.round((g.onlineCount / g.totalCount) * 1000) / 10 : 0,
          total_snapshots: g.totalCount,
          online_snapshots: g.onlineCount,
        }));

        setStats(dailyStats);
      } catch (err) {
        console.error('Error in useServerStats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [days]);

  // Computed summaries
  const summary = {
    avgPlayers: stats.length > 0 ? Math.round(stats.reduce((a, s) => a + s.avg_players, 0) / stats.length) : 0,
    peakPlayers: stats.length > 0 ? Math.max(...stats.map(s => s.peak_players)) : 0,
    uptimePct: stats.length > 0 ? Math.round(stats.reduce((a, s) => a + s.uptime_pct, 0) / stats.length * 10) / 10 : 0,
    daysOnline: stats.filter(s => s.uptime_pct > 0).length,
    totalDays: stats.length,
  };

  return { stats, summary, loading };
}
