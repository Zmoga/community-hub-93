import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const onlineMembers = [
  { name: "BloodKing", avatar: "", status: "online", role: "Owner" },
  { name: "NightHawk", avatar: "", status: "online", role: "Admin" },
  { name: "ShadowX", avatar: "", status: "idle", role: "Moderator" },
  { name: "ChaosLord", avatar: "", status: "online", role: "Member" },
  { name: "VenomStrike", avatar: "", status: "online", role: "Member" },
  { name: "DeathRider", avatar: "", status: "dnd", role: "Member" },
  { name: "PhantomGhost", avatar: "", status: "online", role: "Member" },
  { name: "WarMachine", avatar: "", status: "online", role: "Member" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "idle":
      return "bg-yellow-500";
    case "dnd":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case "Owner":
      return "bg-primary/20 text-primary border-primary/50";
    case "Admin":
      return "bg-amber-500/20 text-amber-400 border-amber-500/50";
    case "Moderator":
      return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const DiscordSection = () => {
  return (
    <section id="discord" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#5865F2] font-semibold tracking-wider uppercase text-sm">
            Join Our Community
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] mt-2 mb-4">
            Discord <span className="text-[#5865F2]">Server</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with other players, find teammates, and stay updated on server events.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Discord Card */}
          <div className="glass rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#5865F2]/20 p-6 border-b border-border/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl gradient-red flex items-center justify-center glow-red-sm">
                    <span className="text-2xl font-bold font-['Orbitron'] text-primary-foreground">NR</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-['Orbitron']">NoRulesPvP</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        892 Online
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                        2,847 Members
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Server
                </Button>
              </div>
            </div>

            {/* Online Members */}
            <div className="p-6">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Online Now — {onlineMembers.length}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {onlineMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-muted text-sm font-bold">
                          {member.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(
                          member.status
                        )}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{member.name}</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-1.5 py-0 ${getRoleBadge(member.role)}`}
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscordSection;
