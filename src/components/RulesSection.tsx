import { AlertTriangle, Check, X } from "lucide-react";

const RulesSection = () => {
  const allowed = [
    "Random Deathmatch (RDM)",
    "Kill on Sight (KOS)",
    "Vehicle Combat",
    "Base Raids",
    "Gang Wars",
    "Spawn Camping",
  ];

  const notAllowed = [
    "Hacking / Exploiting",
    "Doxxing / Real-life Threats",
    "Server Crashing Attempts",
    "Impersonating Staff",
  ];

  return (
    <section id="rules" className="py-24 relative bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Know Before You Play
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] mt-2 mb-4">
            Server <span className="text-primary text-glow">Rules</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We keep it simple. Maximum freedom with minimal restrictions.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="glass rounded-xl p-6 mb-12 border-primary/30 glow-red-sm max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold font-['Orbitron'] text-primary mb-2">
                No Rules PvP Server
              </h3>
              <p className="text-muted-foreground">
                This is a pure chaos server. Expect to be killed, robbed, and betrayed. 
                If you can't handle the heat, this isn't the server for you.
              </p>
            </div>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Allowed */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold font-['Orbitron'] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              Allowed
            </h3>
            <ul className="space-y-3">
              {allowed.map((rule, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <Check className="w-4 h-4 text-green-500" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Not Allowed */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold font-['Orbitron'] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              Not Allowed
            </h3>
            <ul className="space-y-3">
              {notAllowed.map((rule, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <X className="w-4 h-4 text-destructive" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
