import { Zap, Car, Crosshair, Building2, Users2, Skull } from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "All Weapons Unlocked",
    description: "Access to every weapon in the game. No grinding, just action.",
  },
  {
    icon: Car,
    title: "Custom Vehicles",
    description: "Exclusive supercars, bikes, and military vehicles ready to spawn.",
  },
  {
    icon: Building2,
    title: "Custom Maps",
    description: "Unique locations and arenas designed for maximum chaos.",
  },
  {
    icon: Zap,
    title: "No Lag",
    description: "Premium servers with minimal ping for smooth gameplay.",
  },
  {
    icon: Users2,
    title: "Active Community",
    description: "Thousands of players ready to fight 24/7.",
  },
  {
    icon: Skull,
    title: "No Rules",
    description: "KOS enabled. RDM allowed. Pure anarchy awaits.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] mt-2 mb-4">
            Server <span className="text-primary text-glow">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience FiveM like never before with our premium features and no restrictions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 hover:glow-red-sm"
            >
              <div className="w-12 h-12 rounded-lg gradient-red flex items-center justify-center mb-4 group-hover:glow-red-sm transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold font-['Orbitron'] mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
