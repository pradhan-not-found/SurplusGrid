import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './lib/supabase';
import { detectOverlaps } from './services/matchingEngine';
import { BlockchainService } from './services/blockchainService';
import { ExpiryService } from './services/expiryService';
import { IotService } from './services/iotService';
import { ReportService } from './services/reportService';
import { NotificationService } from './services/notificationService';
import { OptimizationService } from './services/optimizationService';
import { WeatherService } from './services/weatherService';

dotenv.config();

// Initialize Services
BlockchainService.init();
ExpiryService.start();
IotService.start();
ReportService.start();

// ⛓️ BLOCKCHAIN CONTRACT ORACLE
// Listens for 'accepted' status and executes the Smart Contract
supabase
    .channel('contract-oracle')
    .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'matches' },
        async (payload) => {
            const match = payload.new;
            // Only trigger if status changed to 'accepted' AND contract isn't locked yet
            if (match.status === 'accepted' && match.contract_status !== 'LOCKED') {
                console.log(`⛓️ Oracle: Executing Smart Contract for match ${match.id}...`);
                
                try {
                    // 1. Log to Blockchain
                    await BlockchainService.logTrade(match.id, match.matched_kw, match.consumer_savings_inr);
                    
                    // 2. Alert the Producer (Verification Success)
                    await NotificationService.send(
                        match.producer_id,
                        '🔒 Blockchain-Verified',
                        `Trade for ${match.matched_kw}kW has been locked on-chain. Verification Complete.`,
                        'verification'
                    );
                } catch (err) {
                    console.error('❌ Oracle Execution Error:', err);
                }
            }
        }
    )
    .subscribe();

// ⚡ AUTOMATIC MATCHING ENGINE
// Listens for new Surplus Windows and triggers the matching engine instantly
supabase
    .channel('autonomous-matching')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'surplus_windows' },
        async (payload) => {
            const window = payload.new;
            console.log(`🚀 Autonomous Engine: New window detected (${window.id}). Finding matches...`);
            
            try {
                // Run matching logic automatically
                await detectOverlaps(window.id);
            } catch (error) {
                console.error(`❌ Autonomous Engine Error for window ${window.id}:`, error);
            }
        }
    )
    .subscribe();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey']
}));
app.use(express.json());

// Routes
app.post('/api/trigger-match', async (req, res) => {
    const { windowId } = req.body;
    if (!windowId) return res.status(400).json({ error: 'windowId is required' });

    try {
        await detectOverlaps(windowId);
        res.json({ message: 'Matching process triggered successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// 🛠️ SYSTEM ALERTS & OPTIMIZATION
app.post('/api/trigger-optimization', async (req, res) => {
    try {
        await OptimizationService.checkUnderUtilization();
        res.json({ message: 'Optimization scan complete. Alerts dispatched.' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/trigger-curtailment', async (req, res) => {
    const { location } = req.body;
    try {
        await OptimizationService.triggerCurtailmentAlert(location || 'Maharashtra');
        res.json({ message: `Grid Curtailment broadcasted to ${location || 'Maharashtra'}` });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/weather/:location', async (req, res) => {
    try {
        const data = await WeatherService.getWeatherData(req.params.location);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/edge-simulation', async (req, res) => {
    const { region } = req.body;
    const requestId = Math.random().toString(36).substring(7).toUpperCase();
    console.log(`📡 [EDGE NODE] Processing Intelligence Request [${requestId}] for region: ${region}`);
    
    // Simulate Edge Intelligence Logic
    const stressFactor = Math.random() > 0.7 ? 'HIGH' : 'STABLE';
    res.json({
        id: requestId,
        region,
        stressFactor,
        recommendation: stressFactor === 'HIGH' ? '🚨 CRITICAL: Trigger Curtailment Protocol' : '✅ STABLE: Maintain Normal Operations',
        processedAt: new Date().toISOString(),
        node: "Edge-Node-Mumbai-1"
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'operational', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`⚡ [SurplusGrid Backend] Running on http://localhost:${PORT}`);
});

export default app;
