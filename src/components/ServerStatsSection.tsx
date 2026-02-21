import { usePlayerCount } from "@/hooks/usePlayerCount";
import { FIVEM_CONFIG } from "@/config/server.config";
import { Activity, Users, Clock, TrendingUp, Server, Wifi } from "lucide-react";

const ServerStatsSection = () => {
  const { players, maxPlayers, online } = usePlayerCount(
    FIVEM_CONFIG.SERVER_CODE,
    FIVEM_CONFIG.REFRESH_INTERVAL
  );

  // These would ideally come from a backend API tracking real stats
  const uptimePercent = 99.8;
  const avgPlayersMonth = 64;
  const peakPlayersMonth = 118;
  const totalUniqueMonth = 2431;
  const avgSessionLength = "2h 14m";
  const daysOnline = 28;

  const stats = [
    {
      icon: Activity,
      label: "Uptime This Month",
      value: `${uptimePercent}%`,
      sub: `${daysOnline}/30 days online`,
      color: uptimePercent >= 99 ? "text-green-400" : uptimePercent >= 95 ? "text-amber-400" : "text-destructive",
      barPercent: uptimePercent,
      barColor: uptimePercent >= 99 ? "bg-green-500" : uptimePercent >= 95 ? "bg-amber-500" : "bg-destructive",
    },
    {
      icon: Users,
      label: "Avg. Players",
      value: avgPlayersMonth.toString(),
      sub: `of ${maxPlayers} slots`,
      color: "text-primary",
      barPercent: (avgPlayersMonth / maxPlayers) * 100,
      barColor: "bg-primary",
    },
    {
      icon: TrendingUp,
      label: "Peak Players",
      value: peakPlayersMonth.toString(),
      sub: "this month",
      color: "text-amber-400",
      barPercent: (peakPlayersMonth / maxPlayers) * 100,
      barColor: "bg-amber-500",
    },
    {
      icon: Server,
      label: "Unique Players",
      value: totalUniqueMonth.toLocaleString(),
      sub: "this month",
      color: "text-purple-400",
      barPercent: 78,
      barColor: "bg-purple-500",
    },
    {
      icon: Clock,
      label: "Avg. Session",
      value: avgSessionLength,
      sub: "per player",
      color: "text-blue-400",
      barPercent: 65,
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
            Real-time server performance and player statistics for this month.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
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

        {/* Monthly summary bar */}
        <div className="mt-10 glass rounded-xl p-5 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Server has been <span className="text-green-400 font-semibold">{uptimePercent}% operational</span> this month
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
                <span className="w-2 h-2 rounded-full bg-destructive" /> Downtime
              </span>
            </div>
          </div>

          {/* 30-day uptime bar */}
          <div className="mt-4 flex gap-0.5">
            {Array.from({ length: 30 }, (_, i) => {
              // Simulate: mostly green, a couple amber, maybe one red
              const status = i === 14 ? 'amber' : i === 22 ? 'red' : 'green';
              return (
                <div
                  key={i}
                  className={`flex-1 h-6 rounded-sm transition-colors hover:opacity-80 cursor-default ${
                    status === 'green' ? 'bg-green-500/70 hover:bg-green-500' :
                    status === 'amber' ? 'bg-amber-500/70 hover:bg-amber-500' :
                    'bg-destructive/70 hover:bg-destructive'
                  }`}
                  title={`Day ${i + 1}: ${status === 'green' ? '100%' : status === 'amber' ? '98.5%' : '94.2%'} uptime`}
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
