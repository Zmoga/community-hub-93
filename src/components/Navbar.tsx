import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Users, Shield, Home, BookOpen, MessageSquare } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Features", href: "#features", icon: BookOpen },
    { name: "Rules", href: "#rules", icon: Shield },
    { name: "Discord", href: "#discord", icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-red flex items-center justify-center glow-red-sm">
              <span className="font-bold text-primary-foreground font-['Orbitron']">NR</span>
            </div>
            <span className="text-xl font-bold font-['Orbitron'] text-glow text-primary">
              NoRulesPvP
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium flex items-center gap-2"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="border-primary/50 hover:border-primary hover:bg-primary/10">
              <Users className="w-4 h-4 mr-2" />
              Connect
            </Button>
            <Button className="gradient-red glow-red-sm hover:opacity-90 transition-opacity">
              <Shield className="w-4 h-4 mr-2" />
              Admin Panel
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass border-l border-border/30">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-muted-foreground hover:text-primary transition-colors duration-300 font-medium flex items-center gap-3"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="outline" className="border-primary/50 w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button className="gradient-red glow-red-sm w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
