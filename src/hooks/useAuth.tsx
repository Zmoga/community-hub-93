import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess, getPermissions, sortRolesByOrder, DISCORD_AUTH_CONFIG, type AppRole } from '@/config/server.config';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  isAdmin: boolean;
  permissions: ReturnType<typeof getPermissions>;
  profile: {
    discord_username?: string;
    discord_avatar?: string;
    discord_id?: string;
  } | null;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  syncRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [profile, setProfile] = useState<AuthContextType['profile']>(null);

  // Calculate derived values
  const isAdmin = hasAdminAccess(roles);
  const permissions = getPermissions(roles);

  const syncRoles = async () => {
    if (!session?.access_token) return;

    try {
      const response = await supabase.functions.invoke('sync-discord-roles', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.data) {
        // Use sorted roles from the config
        const sortedRoles = sortRolesByOrder(response.data.roles || []);
        setRoles(sortedRoles);
        setProfile(response.data.profile || null);
      }
    } catch (error) {
      console.error('Error syncing roles:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          // Defer role sync to avoid blocking
          setTimeout(() => syncRoles(), 100);
        } else {
          setRoles([]);
          setProfile(null);
        }
      }
    );

    // THEN get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        syncRoles();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}${DISCORD_AUTH_CONFIG.REDIRECT_PATH}`,
        scopes: 'identify guilds guilds.members.read',
      },
    });

    if (error) {
      console.error('Error signing in with Discord:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
    setRoles([]);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        roles,
        isAdmin,
        permissions,
        profile,
        signInWithDiscord,
        signOut,
        syncRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
