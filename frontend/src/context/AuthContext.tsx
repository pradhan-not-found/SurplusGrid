import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, password?: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user's profile from the public.profiles table
  const fetchProfile = async (userId: string, email: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching profile:', error);
      return null;
    }

    const profileData: any = data;

    // Map the database profile to the frontend User type
    const currentUser: User = {
      id: profileData.id,
      name: profileData.full_name || email.split('@')[0],
      email: profileData.email,
      role: profileData.role as 'producer' | 'consumer' | null,
      onboardingComplete: profileData.onboarding_complete || false,
      companyName: profileData.company_name || undefined,
      state: profileData.state_location || undefined,
    };
    return currentUser;
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email || '');
        if (profile) setUser(profile);
      }
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email || '');
        if (profile) setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password?: string) => {
    if (!password) {
      // Mock login fallback if password is not provided (for older UI)
      throw new Error("Password is required for Supabase login");
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (email: string, password?: string, name?: string) => {
    if (!password) {
       throw new Error("Password is required for Supabase signup");
    }
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { full_name: name }
      }
    });
    if (error) throw error;

    // The trigger will automatically create the profile, but we can update the name if provided
    if (data?.user && name) {
      await (supabase.from('profiles') as any).update({ full_name: name }).eq('id', data.user.id);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    
    // Map frontend User type fields back to database profile fields
    const updates: any = { updated_at: new Date().toISOString() };
    if (data.name !== undefined) updates.full_name = data.name;
    if (data.role !== undefined) updates.role = data.role;
    if (data.onboardingComplete !== undefined) updates.onboarding_complete = data.onboardingComplete;
    if (data.companyName !== undefined) updates.company_name = data.companyName;
    if (data.state !== undefined) updates.state_location = data.state;
    if (data.shiftableHours !== undefined) updates.shiftable_hours = data.shiftableHours;

    const { error } = await (supabase.from('profiles') as any)
      .update(updates)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    // Optimistically update local state
    setUser((prev) => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {!loading && children}
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
