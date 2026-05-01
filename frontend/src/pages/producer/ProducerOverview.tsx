import DashboardLayout from '../../components/DashboardLayout';
import { Zap, ShieldCheck, IndianRupee, GitMerge, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { startOfMonth, format } from 'date-fns';

export default function ProducerOverview() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  
  const [todaysPredictedSurplus, setTodaysPredictedSurplus] = useState(0);
  const [curtailmentAvoided, setCurtailmentAvoided] = useState(0);
  const [activeMatchesCount, setActiveMatchesCount] = useState(0);
  const [revenueThisMonth, setRevenueThisMonth] = useState(0);
  
  const [upcomingWindows, setUpcomingWindows] = useState<any[]>([]);
  const [activeMatches, setActiveMatches] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const firstDayOfMonthStr = format(startOfMonth(new Date()), 'yyyy-MM-dd');

    const p1 = supabase.from('surplus_windows')
      .select('*')
      .eq('producer_id', user.id)
      .eq('date', todayStr)
      .order('start_time');

    const p2 = supabase.from('matches')
      .select(`
        *,
        surplus_windows!inner(producer_id, date, start_time, end_time, predicted_kw),
        profiles!consumer_id(full_name, company_name)
      `)
      .eq('surplus_windows.producer_id', user.id)
      .eq('status', 'accepted');

    const p3 = supabase.from('surplus_windows')
      .select('*, matches(producer_revenue_inr, status, matched_kw)')
      .eq('producer_id', user.id)
      .gte('date', firstDayOfMonthStr);

    const [res1, res2, res3] = await Promise.all([p1, p2, p3]);

    // Query 1: Today's windows
    const todaysWindows = res1.data || [];
    const predictedSumKw = todaysWindows
      .filter(w => w.status !== 'expired')
      .reduce((sum, w) => sum + w.predicted_kw, 0);
    setTodaysPredictedSurplus(predictedSumKw / 1000); // MW

    // Query 2: Active Matches
    const matches = res2.data || [];
    const todaysMatches = matches.filter(m => m.surplus_windows?.date === todayStr);
    setActiveMatchesCount(todaysMatches.length);
    setActiveMatches(matches);

    // Query 3: This month's data
    const monthWindows = res3.data || [];
    let curtailmentKw = 0;
    let revenue = 0;
    
    monthWindows.forEach(w => {
      if (w.matches) {
        const matchArr = Array.isArray(w.matches) ? w.matches : [w.matches];
        matchArr.forEach((m: any) => {
          if (m.status === 'accepted') {
            curtailmentKw += (m.matched_kw || 0);
            revenue += (m.producer_revenue_inr || 0);
          }
        });
      }
    });
    setCurtailmentAvoided(curtailmentKw / 1000); // MWh
    setRevenueThisMonth(revenue);

    // Fetch Upcoming Windows table
    const { data: upcomingData } = await supabase.from('surplus_windows')
      .select('*')
      .eq('producer_id', user.id)
      .gte('date', todayStr)
      .order('date')
      .order('start_time')
      .limit(10);
      
    setUpcomingWindows(upcomingData || []);
    setLoading(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (loading) {
    return (
      <DashboardLayout title="Overview">
        <div className="grid grid-cols-4 gap-5 mb-[40px]">
          {[1, 2, 3, 4].map(i => (
             <div key={i} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[10px] h-[120px]" />
          ))}
        </div>
        <div className="bg-gray-100 animate-pulse rounded-[10px] h-[200px] mb-8" />
        <div className="flex gap-4">
          {[1, 2, 3].map(i => (
             <div key={i} className="bg-gray-100 animate-pulse rounded-[10px] h-[150px] min-w-[280px]" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Overview">
      <div className="grid grid-cols-4 gap-5 mb-[40px]">
        
        {/* Stat 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Today's predicted surplus</span>
            <Zap size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">{todaysPredictedSurplus.toFixed(1)}</span>
            <span className="text-[14px] font-medium text-[#71717A]">MW</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Curtailment avoided (month)</span>
            <ShieldCheck size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">{curtailmentAvoided.toFixed(1)}</span>
            <span className="text-[14px] font-medium text-[#71717A]">MWh</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Active consumer matches</span>
            <GitMerge size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">{activeMatchesCount}</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Revenue this month</span>
            <IndianRupee size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[24px] font-bold text-[#09090B] tracking-tight">{formatCurrency(revenueThisMonth)}</span>
          </div>
        </div>

      </div>

      <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight mb-4">Upcoming surplus windows</h3>
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-[40px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Date</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Time Window</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Predicted Surplus</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingWindows.map((w) => (
              <tr key={w.id} className="border-b border-[#F4F4F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-150">
                <td className="p-[16px_20px] text-[14px] text-[#09090B] font-medium">{w.date}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{w.start_time.substring(0, 5)}–{w.end_time.substring(0, 5)}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{w.predicted_kw} kW</td>
                <td className="p-[16px_20px] text-[14px] capitalize">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium border ${
                    w.status === 'matched' ? 'bg-[#ECFDF5] text-[#065F46] border-[#D1FAE5]' :
                    w.status === 'seeking' ? 'bg-[#FFFBEB] text-[#92400E] border-[#FEF3C7]' :
                    w.status === 'partial' ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]' :
                    'bg-[#F4F4F5] text-[#3F3F46] border-[#E4E4E7]'
                  }`}>
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
            {upcomingWindows.length === 0 && (
              <tr>
                <td colSpan={4} className="p-[32px] text-center text-[#71717A] text-[14px]">
                  No upcoming surplus windows. <br /> <a href="/dashboard/producer/windows" className="text-[#2563EB] hover:underline mt-2 inline-block">Add your first surplus window</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight mb-4">Active match cards</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {activeMatches.map((m, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm p-5 min-w-[280px] hover:border-[#D4D4D8] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[15px] font-bold text-[#09090B] tracking-tight">{m.profiles?.company_name || 'Consumer'}</div>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#ECFDF5] text-[#065F46] border border-[#D1FAE5]">Active</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#71717A]">Volume</span>
                <span className="font-medium text-[#09090B]">{(m.matched_kw / 1000).toFixed(2)} MW</span>
              </div>
              <div className="h-[1px] w-full bg-[#F4F4F5]" />
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#71717A]">Time</span>
                <span className="font-medium text-[#09090B]">{m.surplus_windows?.start_time?.substring(0, 5)}–{m.surplus_windows?.end_time?.substring(0, 5)}</span>
              </div>
              <div className="h-[1px] w-full bg-[#F4F4F5]" />
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#71717A]">Date</span>
                <span className="font-medium text-[#09090B]">{m.surplus_windows?.date}</span>
              </div>
            </div>
          </div>
        ))}
        {activeMatches.length === 0 && (
          <div className="p-8 text-center border border-dashed border-[#E5E7EB] rounded-[10px] w-full text-[14px] text-[#71717A]">
            No active matches right now.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
