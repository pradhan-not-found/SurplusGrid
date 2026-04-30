import { useAuth } from '../context/AuthContext';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, Zap, GitMerge, Settings2, 
  BellRing, CalendarClock, TrendingUp,
  LogOut, Bell, Sun, Factory, CheckCircle2
} from 'lucide-react';

export default function DashboardLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const producerLinks = [
    { label: 'Overview', path: '/dashboard/producer', icon: LayoutDashboard },
    { label: 'Surplus Windows', path: '/dashboard/producer/windows', icon: Zap },
    { label: 'Matches', path: '/dashboard/producer/matches', icon: GitMerge },
    { label: 'Settings', path: '/dashboard/producer/settings', icon: Settings2 },
  ];

  const consumerLinks = [
    { label: 'Overview', path: '/dashboard/consumer', icon: LayoutDashboard },
    { label: 'Energy Alerts', path: '/dashboard/consumer/alerts', icon: BellRing },
    { label: 'Load Schedule', path: '/dashboard/consumer/schedule', icon: CalendarClock },
    { label: 'Savings', path: '/dashboard/consumer/savings', icon: TrendingUp },
    { label: 'Settings', path: '/dashboard/consumer/settings', icon: Settings2 },
  ];

  const links = user.role === 'producer' ? producerLinks : consumerLinks;
  
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'U';

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-body text-[#0D1117]">
      {/* Sidebar */}
      <div className="w-[240px] bg-white flex flex-col border-r border-[#E5E7EB] shrink-0">
        <div className="pt-[24px] px-[20px] pb-[8px]">
          <img src="/logo.png" alt="SurplusGrid" className="w-[120px] mb-4" />
          <div className="inline-flex items-center gap-1.5 px-[8px] py-[4px] rounded-[6px] border border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-medium text-[#475569] shadow-sm">
            {user.role === 'producer' ? <Sun size={12} className="text-[#F59E0B]" /> : <Factory size={12} className="text-[#2563EB]" />}
            {user.role === 'producer' ? 'Energy Producer' : 'C&I Consumer'}
          </div>
        </div>
        
        <div className="h-[1px] bg-[#F1F5F9] mx-5 my-4" />
        
        <div className="px-5 mb-2 text-[10px] font-medium text-[#6B7280] tracking-[0.1em] uppercase">
          Platform
        </div>

        <nav className="flex-1 px-3 space-y-[2px]">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`relative flex items-center gap-[10px] h-[40px] px-[16px] rounded-[8px] transition-all duration-120
                  ${isActive 
                    ? 'bg-[#EFF6FF] text-[#2563EB] font-medium' 
                    : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#0D1117]'}`}
              >
                {isActive && <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#2563EB] rounded-r-full" />}
                <Icon size={18} strokeWidth={1.5} className={isActive ? 'text-[#2563EB]' : 'text-[#9CA3AF]'} />
                <span className="text-[14px]">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#E5E7EB] mt-auto">
          <div className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F0F7FF] text-[#2563EB] flex items-center justify-center text-[13px] font-medium shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden">
              <div className="text-[13px] font-medium text-[#0D1117] truncate">{user.name}</div>
              <div className="text-[11px] text-[#6B7280] truncate">{user.email}</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-[10px] px-[28px] py-3 text-[13px] text-[#6B7280] hover:text-[#EF4444] hover:bg-[#F9FAFB] group transition-colors duration-120"
          >
            <LogOut size={15} strokeWidth={1.5} className="group-hover:text-[#EF4444] transition-colors" />
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
              <Bell size={18} strokeWidth={1.5} className="text-[#374151]" />
              <div className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-[#EF4444] border-2 border-white text-white flex items-center justify-center text-[10px] font-bold">
                2
              </div>
            </button>

            {showNotifications && (
              <div className="absolute top-[48px] right-12 w-[280px] bg-white border border-[#E5E7EB] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] z-50 overflow-hidden">
                <div className="flex justify-between items-center p-3 border-b border-[#F1F5F9]">
                  <span className="font-bold text-[14px]">Notifications</span>
                  <button className="text-[12px] text-[#2563EB] hover:underline">Mark all read</button>
                </div>
                <div className="divide-y divide-[#F1F5F9]">
                  <div className="p-3 hover:bg-[#F9FAFB] cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0"><Zap size={14} /></div>
                      <div>
                        <p className="text-[13px] text-[#0D1117] leading-snug">New surplus window matched</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-1">2 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[#F9FAFB] cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#10B981] shrink-0"><CheckCircle2 size={14} /></div>
                      <div>
                        <p className="text-[13px] text-[#0D1117] leading-snug">Settlement report generated</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="#" className="block p-2 text-center text-[13px] text-[#2563EB] hover:bg-[#F9FAFB] font-medium border-t border-[#F1F5F9]">
                  View all
                </Link>
              </div>
            )}

            <div className="w-8 h-8 rounded-full bg-[#1E3A5F] text-[#60A5FA] flex items-center justify-center text-[13px] font-medium cursor-pointer">
              {initials}
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
                {user.role === 'producer' 
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
