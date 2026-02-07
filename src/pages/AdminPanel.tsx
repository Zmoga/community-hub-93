import { useEffect } from 'react';
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
  AlertTriangle
} from 'lucide-react';

const AdminPanel = () => {
  const { user, isAdmin, roles, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
              Contact a server owner to get admin, developer, or owner role.
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

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'admin':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'developer':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'moderator':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
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
                  <div className="flex gap-1">
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
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gradient-red hover:opacity-90" size="lg">
                <Ban className="w-4 h-4 mr-2" />
                Ban Player
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Users className="w-4 h-4 mr-2" />
                View Players
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Shield className="w-4 h-4 mr-2" />
                Manage Roles
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
                <Activity className="w-4 h-4 mr-2" />
                Server Logs
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg">
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
