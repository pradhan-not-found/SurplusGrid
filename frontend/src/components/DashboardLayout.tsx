import { useAuth } from '../context/AuthContext';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Zap, GitMerge, Settings2, 
  BellRing, TrendingUp,
  LogOut, Bell, CheckCircle2, User, ChevronRight, AlertTriangle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function DashboardLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        setNotifications(data);
      }
    };

    fetchNotifications();

    // ⚡ REALTIME NOTIFICATIONS
    console.log('🔌 Initiating Realtime for User:', user.id);
    const channel = supabase
      .channel(`user-notifications-${user.id}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('🔔 LIVE: New notification received!', payload.new);
          setNotifications(prev => [payload.new, ...prev].slice(0, 10));
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription Status:', status);
      });

    return () => {
      console.log('🔌 Closing Realtime Channel');
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  if (!user || !profile) {
    return <Navigate to="/signin" replace />;
  }

  const markAllRead = async () => {
    await supabase
      .from('notifications')
      .update({ is_read: true } as any)
      .eq('user_id', user.id)
      .eq('is_read', false);
    
    setNotifications([]);
  };

  const producerLinks = [
    { label: 'Overview', path: '/dashboard/producer', icon: LayoutDashboard },
    { label: 'Surplus Windows', path: '/dashboard/producer/windows', icon: Zap },
    { label: 'Matches', path: '/dashboard/producer/matches', icon: GitMerge },
    { label: 'Settings', path: '/dashboard/producer/settings', icon: Settings2 },
  ];

  const consumerLinks = [
    { label: 'Overview', path: '/dashboard/consumer', icon: LayoutDashboard },
    { label: 'Energy Alerts', path: '/dashboard/consumer/alerts', icon: BellRing },
    { label: 'Savings', path: '/dashboard/consumer/savings', icon: TrendingUp },
    { label: 'Settings', path: '/dashboard/consumer/settings', icon: Settings2 },
  ];

  const links = profile.role === 'producer' ? producerLinks : consumerLinks;
  
  const userName = profile?.full_name || user?.user_metadata?.full_name || profile?.company_name || 'User';
  const initials = userName.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase();

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-body text-[#0D1117]">
      {/* Sidebar */}
      <div className="w-[260px] bg-white border-r border-[#E5E7EB] flex flex-col shrink-0">
        <div className="pt-[32px] px-[24px] pb-[12px]">
          <div className="flex items-center mb-6">
            <img src="/logo.png" alt="SurplusGrid" className="w-[130px] h-auto object-contain" />
          </div>
          
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F4F4F5] text-[#71717A] border border-[#E5E7EB] mb-6">
            {profile.role === 'producer' ? 'Energy Producer' : 'C&I Consumer'}
          </div>
        </div>
        
        <div className="px-6 mb-3 text-[11px] font-semibold text-[#A1A1AA] tracking-wider uppercase">
          Platform
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-3 h-[40px] px-4 rounded-[8px] transition-all duration-150
                  ${isActive 
                    ? 'bg-[#F4F4F5] text-[#09090B] font-semibold shadow-sm' 
                    : 'text-[#71717A] hover:bg-[#FAFAFA] hover:text-[#09090B]'}`}
              >
                <Icon size={18} className={isActive ? 'text-[#09090B]' : 'text-[#A1A1AA]'} />
                <span className="text-[14px]">{link.label}</span>
              </Link>
            );
          })}
        </nav>


        <div className="border-t border-[#E5E7EB] mt-auto">
          <div className="p-5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F4F4F5] text-[#09090B] flex items-center justify-center text-[13px] font-bold shrink-0 border border-[#E5E7EB]">
              {initials}
            </div>
            <div className="overflow-hidden">
              <div className="text-[13px] font-semibold text-[#09090B] truncate">{userName}</div>
              <div className="text-[11px] text-[#71717A] truncate">{user.email}</div>
            </div>
          </div>
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-[10px] px-5 py-4 text-[13px] text-[#71717A] hover:text-[#EF4444] hover:bg-[#FFF5F5] group transition-colors border-t border-[#F4F4F5]"
          >
            <LogOut size={16} className="group-hover:text-[#EF4444] transition-colors" />
            Sign out
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-[60px] bg-white border-b border-[#F1F5F9] flex items-center justify-between px-8 shrink-0">
          <h1 className="text-[18px] font-bold text-[#0D1117] tracking-[-0.01em]">{title}</h1>
          
          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 border border-[#E5E7EB] rounded-[8px] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors"
            >
              <Bell size={18} className="text-[#374151]" />
              {notifications.length > 0 && (
                <div className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-[#EF4444] border-2 border-white text-white flex items-center justify-center text-[10px] font-bold">
                  {notifications.length}
                </div>
              )}
            </button>

            {showNotifications && (
              <div className="absolute top-[48px] right-12 w-[280px] bg-white border border-[#E5E7EB] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] z-50 overflow-hidden">
                <div className="flex justify-between items-center p-3 border-b border-[#F1F5F9]">
                  <span className="font-bold text-[14px]">Notifications</span>
                  {notifications.length > 0 && (
                    <button onClick={markAllRead} className="text-[12px] text-[#2563EB] hover:underline">Mark all read</button>
                  )}
                </div>
                <div className="divide-y divide-[#F1F5F9] max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-[13px] text-[#6B7280]">No new notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-3 hover:bg-[#F9FAFB] cursor-pointer">
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            n.type === 'alert' ? 'bg-[#FEF2F2] text-[#EF4444]' :
                            n.type === 'match' ? 'bg-[#ECFDF5] text-[#10B981]' :
                            'bg-[#EFF6FF] text-[#2563EB]'
                          }`}>
                            {n.type === 'alert' ? <AlertTriangle size={14} /> :
                             n.type === 'match' ? <CheckCircle2 size={14} /> :
                             <Zap size={14} />}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-[#0D1117] mb-0.5">{n.title}</p>
                            <p className="text-[12px] text-[#71717A] leading-snug">{n.message}</p>
                            <p className="text-[11px] text-[#A1A1AA] mt-1">{new Date(n.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Profile avatar + dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                className="w-8 h-8 rounded-full bg-[#0D1117] text-white flex items-center justify-center text-[12px] font-semibold hover:ring-2 hover:ring-[#E5E7EB] transition-all"
              >
                {initials}
              </button>

              {showProfile && (
                <div className="absolute top-[44px] right-0 w-[240px] bg-white border border-[#E5E7EB] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.10)] z-50 overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0D1117] text-white flex items-center justify-center text-[13px] font-semibold shrink-0">
                        {initials}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[13px] font-semibold text-[#0D1117] truncate">{userName}</p>
                        <p className="text-[11px] text-[#9CA3AF] truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="mt-2.5 inline-flex items-center gap-1">
                      <span className="text-[10px] font-medium text-[#9CA3AF] tracking-[0.08em] uppercase">
                        {profile.role === 'producer' ? 'Energy Producer' : 'C&I Consumer'}
                      </span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      to={profile.role === 'producer' ? '/dashboard/producer/settings' : '/dashboard/consumer/settings'}
                      onClick={() => setShowProfile(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-[13px] text-[#374151] hover:bg-[#F9FAFB] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <User size={14} className="text-[#9CA3AF] group-hover:text-[#374151]" />
                        Account Settings
                      </div>
                      <ChevronRight size={13} className="text-[#D1D5DB]" />
                    </Link>
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-[#F1F5F9] py-1">
                    <button
                      onClick={() => { setShowProfile(false); signOut(); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#EF4444] hover:bg-[#FFF5F5] transition-colors"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1100px] mx-auto">
            {/* Header Block inside content */}
            <div className="mb-[24px]">
              <h2 className="text-[22px] font-bold text-[#0D1117] tracking-[-0.01em]">{title}</h2>
              <p className="text-[14px] text-[#6B7280]">
                {profile.role === 'producer' 
                  ? 'Manage your surplus generation and grid injections.' 
                  : 'Monitor your flexible load shifts and clean energy savings.'}
              </p>
            </div>
            <div className="h-[1px] bg-[#F1F5F9] mb-[24px]" />
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
