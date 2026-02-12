import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, Gamepad2, Copy, Check } from "lucide-react";
import { usePlayerCount } from "@/hooks/usePlayerCount";
import { FIVEM_CONFIG, DISCORD_AUTH_CONFIG } from "@/config/server.config";

const HeroSection = () => {
  const { players, maxPlayers, online, loading } = usePlayerCount(
    FIVEM_CONFIG.SERVER_CODE,
    FIVEM_CONFIG.REFRESH_INTERVAL
  );
  
  const [displayPlayers, setDisplayPlayers] = useState(47);
  const [copied, setCopied] = useState(false);
  const serverIP = FIVEM_CONFIG.CONNECT_STRING;

  // Use real data when available, otherwise show demo
  useEffect(() => {
    if (!loading && online) {
      setDisplayPlayers(players);
    }
  }, [players, loading, online]);

  // Simulate live player count updates when API is not available
  useEffect(() => {
    if (loading || !online) {
      const interval = setInterval(() => {
        setDisplayPlayers((prev) => {
          const change = Math.floor(Math.random() * 5) - 2;
          const newCount = prev + change;
          return Math.max(10, Math.min(128, newCount));
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, online]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Server Status Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 glow-red-sm">
            <span className={`w-2 h-2 rounded-full animate-pulse ${online ? 'bg-green-500' : 'bg-amber-500'}`} />
            <span className="text-sm font-medium text-muted-foreground">
              {loading ? 'Connecting...' : online ? 'Server Online' : 'Demo Mode'}
            </span>
            <span className="text-xs text-muted-foreground/60 font-mono">
              — {FIVEM_CONFIG.SERVER_CODE}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 font-['Orbitron'] tracking-wider">
            <span className="text-foreground">NO</span>
            <span className="text-primary text-glow">RULES</span>
            <span className="text-foreground">PVP</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate FiveM experience. No rules, just pure chaos and adrenaline.
            <span className="text-primary"> Survive if you can.</span>
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-md mx-auto mb-10">
            {/* Player Count */}
            <div className="glass rounded-xl p-6 glow-red-sm animate-pulse-glow">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Players Online</span>
              </div>
              <div className="text-4xl font-bold font-['Orbitron'] text-primary text-glow">
                {displayPlayers}
                <span className="text-lg text-muted-foreground">/{maxPlayers}</span>
              </div>
            </div>

            {/* Discord Members */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm text-muted-foreground">Discord</span>
              </div>
              <div className="text-4xl font-bold font-['Orbitron'] text-[#5865F2]">
                2,847
              </div>
            </div>
          </div>

          {/* Server IP */}
          <div className="glass rounded-xl p-4 max-w-lg mx-auto mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <code className="text-sm md:text-base font-mono text-muted-foreground">{serverIP}</code>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="hover:bg-primary/20"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-red glow-red text-lg px-8 py-6 font-semibold hover:opacity-90 transition-opacity"
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Play Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-primary/50 hover:border-primary hover:bg-primary/10"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
