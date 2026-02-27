import { usePlayerCount } from "@/hooks/usePlayerCount";
import { useServerStats } from "@/hooks/useServerStats";
import { FIVEM_CONFIG } from "@/config/config";
import { Activity, Users, Clock, TrendingUp, Server, Wifi } from "lucide-react";

const ServerStatsSection = () => {
  const { players, maxPlayers, online } = usePlayerCount(
    FIVEM_CONFIG.SERVER_CODE,
    FIVEM_CONFIG.REFRESH_INTERVAL
  );

  const { stats, summary, loading } = useServerStats();

  const statCards = [
    {
      icon: Activity,
      label: "Uptime This Month",
      value: `${summary.uptimePct}%`,
      sub: `${summary.daysOnline}/${summary.totalDays || 30} days online`,
      color: summary.uptimePct >= 99 ? "text-green-400" : summary.uptimePct >= 95 ? "text-amber-400" : "text-destructive",
      barPercent: summary.uptimePct,
      barColor: summary.uptimePct >= 99 ? "bg-green-500" : summary.uptimePct >= 95 ? "bg-amber-500" : "bg-destructive",
    },
    {
      icon: Users,
      label: "Avg. Players",
      value: summary.avgPlayers.toString(),
      sub: `of ${maxPlayers} slots`,
      color: "text-primary",
      barPercent: (summary.avgPlayers / maxPlayers) * 100,
      barColor: "bg-primary",
    },
    {
      icon: TrendingUp,
      label: "Peak Players",
      value: summary.peakPlayers.toString(),
      sub: "this month",
      color: "text-amber-400",
      barPercent: (summary.peakPlayers / maxPlayers) * 100,
      barColor: "bg-amber-500",
    },
    {
      icon: Server,
      label: "Total Snapshots",
      value: stats.reduce((a, s) => a + s.total_snapshots, 0).toLocaleString(),
      sub: "data points recorded",
      color: "text-purple-400",
      barPercent: Math.min(stats.reduce((a, s) => a + s.total_snapshots, 0) / 100, 100),
      barColor: "bg-purple-500",
    },
    {
      icon: Clock,
      label: "Days Tracked",
      value: summary.totalDays.toString(),
      sub: "with data",
      color: "text-blue-400",
      barPercent: (summary.totalDays / 30) * 100,
      barColor: "bg-blue-500",
    },
    {
      icon: Wifi,
      label: "Current Status",
      value: online ? `${players} online` : "Offline",
      sub: online ? `${Math.round((players / maxPlayers) * 100)}% capacity` : "Server unreachable",
      color: online ? "text-green-400" : "text-destructive",
      barPercent: online ? (players / maxPlayers) * 100 : 0,
      barColor: online ? "bg-green-500" : "bg-destructive",
    },
  ];

  return (
    <section className="py-20 relative bg-gradient-to-b from-background via-card/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Performance
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] mt-2 mb-4">
            Server <span className="text-primary text-glow">Stats</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {loading ? "Loading real-time stats…" : "Live server performance tracked automatically."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className={`text-3xl font-bold font-['Orbitron'] mt-1 ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{stat.sub}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-card rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${stat.barColor} transition-all duration-700`}
                  style={{ width: `${Math.min(stat.barPercent, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 30-day uptime bar from real data */}
        <div className="mt-10 glass rounded-xl p-5 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Server has been <span className="text-green-400 font-semibold">{summary.uptimePct}% operational</span> this month
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Operational
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Degraded
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-destructive" /> No Data
              </span>
            </div>
          </div>

          {/* Real 30-day bar */}
          <div className="mt-4 flex gap-0.5">
            {Array.from({ length: 30 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (29 - i));
              const dateStr = date.toISOString().slice(0, 10);
              const dayStat = stats.find(s => s.date === dateStr);

              const status = !dayStat
                ? 'none'
                : dayStat.uptime_pct >= 99 ? 'green'
                : dayStat.uptime_pct >= 80 ? 'amber'
                : 'red';

              return (
                <div
                  key={i}
                  className={`flex-1 h-6 rounded-sm transition-colors hover:opacity-80 cursor-default ${
                    status === 'green' ? 'bg-green-500/70 hover:bg-green-500' :
                    status === 'amber' ? 'bg-amber-500/70 hover:bg-amber-500' :
                    status === 'red' ? 'bg-destructive/70 hover:bg-destructive' :
                    'bg-muted/30 hover:bg-muted/50'
                  }`}
                  title={`${dateStr}: ${dayStat ? `${dayStat.uptime_pct}% uptime, peak ${dayStat.peak_players}` : 'No data'}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground/50">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatsSection;
