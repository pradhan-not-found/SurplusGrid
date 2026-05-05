import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { IndianRupee, CalendarCheck, Leaf, Wind, Zap, ArrowRight, X, Mail, Smartphone, CheckCircle2, Calendar, Activity } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ConsumerOverview() {
  const { user } = useAuth();
  const [showBanner, setShowBanner] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    savings: 0,
    shifts: 0,
    cleanEnergy: 0,
    carbonOffset: 0
  });

  const [alerts, setAlerts] = useState<any[]>([]);
  const [shifts, setShifts] = useState<any[]>([]);
  const [heatmap, setHeatmap] = useState<Record<string | number, number>>({});

  useEffect(() => {
    if (!user) return;
    
    // Initial fetch
    fetchConsumerData();

    // Set up Realtime listener for this consumer's matches
    const channel = supabase
      .channel('realtime-matches')
      .on(
        'postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'matches',
          filter: `consumer_id=eq.${user.id}`
        }, 
        () => {
          console.log('⚡ Realtime match update detected! Refreshing data...');
          fetchConsumerData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);


  const fetchConsumerData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // 1. Try to fetch pre-calculated report first
      const { data: report } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .eq('report_type', 'monthly_summary')
        .single();

      if (report && report.heatmap_data) {
        setHeatmap(report.heatmap_data);
      }

      // 2. Fetch all matches for this consumer
      const { data: matches, error } = await supabase
        .from('matches')
        .select(`
          *,
          surplus_windows (
            date,
            start_time,
            end_time
          )
        `)
        .eq('consumer_id', user.id);

      if (error) throw error;

      const allMatches = matches || [];
      
       // 2. Calculate Stats
      const savings = allMatches.reduce((sum, m) => sum + (m.consumer_savings_inr || 0), 0);
      const cleanEnergy = allMatches.reduce((sum, m) => sum + (m.matched_kw || 0), 0);
      const shiftsCompleted = allMatches.filter(m => m.status === 'accepted' || m.status === 'completed').length;
      const carbonOffset = allMatches.reduce((sum, m) => sum + (m.carbon_offset_kg || 0), 0);

      setStats({
        savings,
        shifts: shiftsCompleted,
        cleanEnergy: cleanEnergy / 1000, 
        carbonOffset
      });

      // 3. Split into Pending and Recent (Safe Mapping)
      const pending = allMatches.filter(m => m.status === 'pending').map(m => {
        // Try to find the window data in any possible key Supabase might use
        const win = m.surplus_windows || (m as any).window;
        return {
          id: m.id,
          time: win ? `${win.date} ${win.start_time?.substring(0, 5)}–${win.end_time?.substring(0, 5)}` : 'Time Pending',
          matchedKw: m.matched_kw,
          savings: m.consumer_savings_inr
        };
      });

      const history = allMatches.filter(m => m.status !== 'pending').map(m => {
        const win = m.surplus_windows || (m as any).window;
        return {
          date: win?.date || 'Today',
          time: win ? `${win.start_time?.substring(0, 5)}–${win.end_time?.substring(0, 5)}` : 'Completed',
          load: m.matched_kw,
          savings: m.consumer_savings_inr,
          status: m.status
        };
      });

      setAlerts(pending);
      setShifts(history);

    } catch (error) {
      console.error('Error fetching consumer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({ status: 'accepted' })
        .eq('id', id);

      if (error) throw error;
      
      // Refresh data
      fetchConsumerData();
    } catch (error) {
      console.error('Error accepting shift:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Overview">
        <div className="w-full h-20 bg-gray-100 animate-pulse rounded-lg mb-8" />
        <div className="grid grid-cols-4 gap-5 mb-10">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />)}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Overview">
      {showBanner && alerts.length > 0 && (
        <div className="w-full rounded-[10px] p-[16px_20px] bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-between mb-[40px] shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#09090B]" />
          <div className="flex items-center gap-4 pl-2">
            <Zap size={20} className="text-[#09090B]" />
            <div>
              <span className="text-[14px] font-semibold text-[#09090B] mr-2">New matching opportunity!</span>
              <span className="text-[14px] text-[#3F3F46]">{alerts[0].time} · Save ₹{alerts[0].savings.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard/consumer/alerts" className="text-[13px] font-semibold text-[#09090B] hover:text-[#3F3F46] flex items-center gap-1.5 transition-colors">
              View details <ArrowRight size={14} />
            </Link>
            <button onClick={() => setShowBanner(false)} className="text-[#A1A1AA] hover:text-[#09090B] transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-5 mb-[40px]">
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Total savings</span>
            <IndianRupee size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">₹{stats.savings.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Load shifts completed</span>
            <CalendarCheck size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">{stats.shifts}</span>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Clean energy used</span>
            <Leaf size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">{stats.cleanEnergy.toFixed(2)}</span>
            <span className="text-[14px] font-medium text-[#71717A]">MWh</span>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Carbon offset</span>
            <Wind size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">{stats.carbonOffset.toFixed(0)}</span>
            <span className="text-[14px] font-medium text-[#71717A]">kg</span>
          </div>
        </div>
      </div>

      {Object.keys(heatmap).length > 0 && (
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 mb-[40px] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight">Grid Intelligence</h3>
              <p className="text-[13px] text-[#71717A]">Your peak energy trading hours over the last 30 days.</p>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#D1FAE5]">
              <Zap size={14} /> Analytics Live
            </div>
          </div>
          <div className="flex items-end justify-between h-[120px] gap-1 px-2 border-b border-[#F4F4F5] pb-2">
            {Array.from({ length: 24 }).map((_, hour) => {
              // Ensure we have a valid count and peak volume
              const counts = Object.values(heatmap).map(v => Number(v) || 0);
              const peak = Math.max(...counts, 1);
              const count = Number(heatmap[hour] || heatmap[String(hour)] || 0);
              
              // Calculate height (with 2% minimum for visibility)
              const height = (count / peak) * 100;
              const displayHeight = count > 0 ? Math.max(height, 8) : 2;
              
              return (
                <div key={hour} className="group relative flex-1 h-full flex flex-col justify-end items-center">
                  <div 
                    className="w-full bg-[#09090B] rounded-t-[2px] transition-all duration-300 ease-out hover:bg-[#2563EB]"
                    style={{ height: `${displayHeight}%` }}
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#09090B] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg pointer-events-none">
                    {hour}:00 · {count} matches
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 px-2">
            <span className="text-[10px] font-medium text-[#A1A1AA]">00:00</span>
            <span className="text-[10px] font-medium text-[#A1A1AA]">12:00</span>
            <span className="text-[10px] font-medium text-[#A1A1AA]">23:00</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight">Pending alerts</h3>
        <Link to="/dashboard/consumer/alerts" className="text-[13px] font-semibold text-[#09090B] hover:text-[#3F3F46] transition-colors">View all alerts →</Link>
      </div>
      
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-[40px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Time Window</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Matched Capacity</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Estimated Savings</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a: any) => (
              <tr key={a.id} className="border-b border-[#F4F4F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-150">
                <td className="p-[16px_20px] text-[14px] font-medium text-[#09090B]">{a.time}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{a.matchedKw} kW</td>
                <td className="p-[16px_20px] text-[14px] font-semibold text-[#10B981]">₹{a.savings.toLocaleString()}</td>
                <td className="p-[16px_20px] text-right">
                  <button onClick={() => handleAccept(a.id)} className="h-[32px] px-[16px] bg-[#09090B] text-white rounded-[6px] font-medium text-[13px] hover:bg-[#27272A] transition-colors shadow-sm">
                    Accept shift
                  </button>
                </td>
              </tr>
            ))}
            {alerts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#71717A] text-[14px]">No pending alerts. Check back later for new surplus windows!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight mb-4">Recent load shifts</h3>
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Date</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Time Window</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Load Shifted</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Savings</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s, i) => (
              <tr key={i} className="border-b border-[#F4F4F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-150">
                <td className="p-[16px_20px] text-[14px] font-medium text-[#09090B]">{s.date}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{s.time}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{s.load} kW</td>
                <td className="p-[16px_20px] text-[14px] font-semibold text-[#10B981]">₹{s.savings.toLocaleString()}</td>
                <td className="p-[16px_20px]">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border ${
                    s.status === 'accepted' ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]' : 'bg-[#ECFDF5] text-[#065F46] border-[#D1FAE5]'
                  }`}>
                    {s.status === 'accepted' ? <><Calendar size={12} /> Scheduled</> : <><CheckCircle2 size={12} /> Completed</>}
                  </span>
                </td>
              </tr>
            ))}
            {shifts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#71717A] text-[14px]">No recent load shifts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight">Communication Engine</h3>
        <span className="flex items-center gap-1 px-2 py-0.5 bg-[#ECFDF5] text-[#10B981] text-[10px] font-bold uppercase rounded border border-[#D1FAE5]"><Activity size={10} /> Live Audit</span>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Channel</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Recipient Info</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Message</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Status</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length > 0 ? (
              alerts.slice(0, 5).map((alert: any) => (
                <tr key={alert.id} className="border-b border-[#F4F4F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-150">
                  <td className="p-[16px_20px]">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 rounded-full bg-[#F1F5F9] border-2 border-white flex items-center justify-center text-[#64748B]">
                          <Mail size={10} />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#F1F5F9] border-2 border-white flex items-center justify-center text-[#64748B]">
                          <Smartphone size={10} />
                        </div>
                      </div>
                      <span className="text-[13px] font-medium text-[#09090B]">SMS & Email</span>
                    </div>
                  </td>
                  <td className="p-[16px_20px] text-[13px] text-[#3F3F46]">Verified Device/SMTP</td>
                  <td className="p-[16px_20px] text-[13px] text-[#3F3F46] max-w-[250px] truncate">{alert.message}</td>
                  <td className="p-[16px_20px]">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] text-[11px] font-medium border border-[#D1FAE5]">
                      <CheckCircle2 size={12} /> Delivered
                    </span>
                  </td>
                  <td className="p-[16px_20px] text-right text-[12px] text-[#71717A]">
                    {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#71717A] text-[14px]">No external alerts dispatched yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

