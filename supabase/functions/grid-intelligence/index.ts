// Follows Supabase Edge Function (Deno) standards
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("🚀 Grid Intelligence Edge Function initialized.");

serve(async (req) => {
  try {
    const { region } = await req.json();
    
    // 1. Initialize Supabase Client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 2. Perform Edge Calculation: Grid Stress Analysis
    // This logic runs at the network edge for ultra-low latency
    const { data: activeWindows } = await supabase
      .from('surplus_windows')
      .select('predicted_kw, available_kw')
      .eq('status', 'seeking');

    const totalSurplus = activeWindows?.reduce((acc, curr) => acc + curr.predicted_kw, 0) || 0;
    const stressFactor = totalSurplus < 1000 ? 'HIGH' : 'STABLE';

    return new Response(
      JSON.stringify({ 
        region, 
        stressFactor, 
        totalSurplus,
        recommendation: stressFactor === 'HIGH' ? 'Trigger Curtailment Protocol' : 'Maintain Normal Operations',
        processedAt: new Date().toISOString(),
        node: "Supabase-Edge-Mumbai-1" 
      }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
