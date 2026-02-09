import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Shield, 
  Home, 
  BookOpen, 
  MessageSquare,
  LogIn,
  LogOut,
  Loader2
} from "lucide-react";
import { ROLE_DISPLAY, ROLES_ORDER, type AppRole } from "@/config/server.config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, roles, profile, signInWithDiscord, signOut, loading } = useAuth();

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Features", href: "#features", icon: BookOpen },
    { name: "Rules", href: "#rules", icon: Shield },
    { name: "Discord", href: "#discord", icon: MessageSquare },
  ];

  const getRoleBadgeStyle = (role: string) => {
    const display = ROLE_DISPLAY[role as AppRole];
    if (!display) return 'bg-muted text-muted-foreground border-border';
    return `${display.bgColor} ${display.color} ${display.borderColor}`;
  };

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
            {loading ? (
              <Button variant="outline" disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </Button>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={profile?.discord_avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {profile?.discord_username?.slice(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium">{profile?.discord_username || 'User'}</p>
                    <div className="flex gap-1">
                      {roles.slice(0, 1).map((role) => (
                        <Badge 
                          key={role} 
                          variant="outline" 
                          className={`text-xs capitalize ${getRoleBadgeStyle(role)}`}
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {isAdmin && (
                  <Button 
                    className="gradient-red glow-red-sm hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/admin')}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                )}
                
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={signInWithDiscord}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Login with Discord
              </Button>
            )}
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
                {/* User Info (Mobile) */}
                {user && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
                    <Avatar>
                      <AvatarImage src={profile?.discord_avatar} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {profile?.discord_username?.slice(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{profile?.discord_username || 'User'}</p>
                      <div className="flex gap-1 flex-wrap">
                        {roles.map((role) => (
                          <Badge 
                            key={role} 
                            variant="outline" 
                            className={`text-xs capitalize ${getRoleBadgeStyle(role)}`}
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

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
                  {user ? (
                    <>
                      {isAdmin && (
                        <Button 
                          className="gradient-red glow-red-sm w-full"
                          onClick={() => {
                            navigate('/admin');
                            setIsOpen(false);
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => {
                        signInWithDiscord();
                        setIsOpen(false);
                      }}
                      className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-full"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login with Discord
                    </Button>
                  )}
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
