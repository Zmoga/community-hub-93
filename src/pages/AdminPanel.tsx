import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Ban, 
  Settings, 
  Activity, 
  Server,
  LogOut,
  Home,
  AlertTriangle,
  FileText,
  Loader2
} from 'lucide-react';
import { ROLE_DISPLAY, ROLES_ORDER, type AppRole } from '@/config/server.config';
import { BanPlayerDialog, KickPlayerDialog, WarnPlayerDialog, UnbanPlayerDialog } from '@/components/admin/ModerationDialogs';
import { RoleManager } from '@/components/admin/RoleManager';
import { supabase } from '@/integrations/supabase/client';

const AdminPanel = () => {
  const { user, isAdmin, roles, permissions, profile, signInWithDiscord, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  // Fetch staff members for role management
  useEffect(() => {
    if (isAdmin && permissions.canManageRoles) {
      fetchStaffMembers();
    }
  }, [isAdmin, permissions.canManageRoles]);

  const fetchStaffMembers = async () => {
    setLoadingStaff(true);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setStaffMembers(data);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoadingStaff(false);
    }
  };

  // Show login screen if not authenticated
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-lg gradient-red flex items-center justify-center glow-red">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-['Orbitron']">Admin Panel</CardTitle>
            <CardDescription>
              Sign in with Discord to access the NoRulesPvP admin panel.
              You need an admin role to access this area.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button 
              onClick={signInWithDiscord} 
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Sign in with Discord
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-['Orbitron'] text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel. 
              Contact a server owner to get a staff role.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
            <Button onClick={signOut} variant="ghost" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    { label: 'Total Players Today', value: '1,234', icon: Users, change: '+12%' },
    { label: 'Active Bans', value: '47', icon: Ban, change: '-3' },
    { label: 'Server Uptime', value: '99.9%', icon: Activity, change: 'Stable' },
    { label: 'Active Sessions', value: '89', icon: Server, change: 'Live' },
  ];

  const recentActions = [
    { action: 'Player banned', target: 'CheaterX123', by: 'BloodKing', time: '5 min ago' },
    { action: 'Warning issued', target: 'NewPlayer99', by: 'NightHawk', time: '12 min ago' },
    { action: 'Kick', target: 'AFKUser', by: 'ShadowX', time: '28 min ago' },
    { action: 'Unban', target: 'ReformedPlayer', by: 'BloodKing', time: '1 hour ago' },
  ];

  const getRoleBadgeClasses = (role: string) => {
    const display = ROLE_DISPLAY[role as AppRole];
    if (!display) return 'bg-muted text-muted-foreground border-border';
    return `${display.bgColor} ${display.color} ${display.borderColor}`;
  };

  // Moderation handlers (these would connect to your FiveM server API)
  const handleBan = async (data: { playerId: string; reason: string; duration: string }) => {
    console.log('Banning player:', data);
    // TODO: Connect to FiveM server API
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleKick = async (data: { playerId: string; reason: string }) => {
    console.log('Kicking player:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleWarn = async (data: { playerId: string; reason: string; severity: string }) => {
    console.log('Warning player:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleUnban = async (data: { playerId: string; reason: string }) => {
    console.log('Unbanning player:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleAssignRole = async (userId: string, role: AppRole) => {
    console.log('Assigning role:', userId, role);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await fetchStaffMembers();
  };

  const handleRemoveRole = async (userId: string, role: AppRole) => {
    console.log('Removing role:', userId, role);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await fetchStaffMembers();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Home className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-red flex items-center justify-center glow-red-sm">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-['Orbitron']">Admin Panel</h1>
                  <p className="text-xs text-muted-foreground">NoRulesPvP Management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={profile?.discord_avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {profile?.discord_username?.slice(0, 2).toUpperCase() || 'AD'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{profile?.discord_username || 'Admin'}</p>
                  <div className="flex gap-1 flex-wrap max-w-[200px]">
                    {ROLES_ORDER.filter(r => roles.includes(r)).slice(0, 2).map((role) => (
                      <Badge 
                        key={role} 
                        variant="outline" 
                        className={`text-xs ${getRoleBadgeClasses(role)}`}
                      >
                        {ROLE_DISPLAY[role].icon} {ROLE_DISPLAY[role].label}
                      </Badge>
                    ))}
                    {roles.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{roles.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold font-['Orbitron']">{stat.value}</p>
                    <p className="text-xs text-primary mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="glass lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-['Orbitron'] flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Your permissions: {Object.entries(permissions).filter(([, v]) => v).length} actions available
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <BanPlayerDialog onBan={handleBan} disabled={!permissions.canBanPlayers} />
              <KickPlayerDialog onKick={handleKick} disabled={!permissions.canKickPlayers} />
              <WarnPlayerDialog onWarn={handleWarn} disabled={!permissions.canWarnPlayers} />
              <UnbanPlayerDialog onUnban={handleUnban} disabled={!permissions.canBanPlayers} />
              
              <div className="pt-2 border-t border-border/30">
                <RoleManager 
                  currentRoles={staffMembers}
                  onAssignRole={handleAssignRole}
                  onRemoveRole={handleRemoveRole}
                  disabled={!permissions.canManageRoles}
                />
              </div>

              <div className="pt-2 border-t border-border/30">
                <Button 
                  className="w-full justify-start" 
                  variant="outline" 
                  size="lg"
                  disabled={!permissions.canViewLogs}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Server Logs
                </Button>
              </div>

              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="lg"
                disabled={!permissions.canManageServer}
              >
                <Server className="w-4 h-4 mr-2" />
                Server Settings
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-['Orbitron'] flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        action.action === 'Player banned' ? 'bg-destructive/20 text-destructive' :
                        action.action === 'Unban' ? 'bg-green-500/20 text-green-500' :
                        'bg-amber-500/20 text-amber-500'
                      }`}>
                        {action.action === 'Player banned' ? <Ban className="w-5 h-5" /> :
                         action.action === 'Unban' ? <Shield className="w-5 h-5" /> :
                         <AlertTriangle className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{action.action}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="text-primary">{action.target}</span> by {action.by}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{action.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
