import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './lib/supabase';
import { detectOverlaps } from './services/matchingEngine';
import { BlockchainService } from './services/blockchainService';
import { ExpiryService } from './services/expiryService';
import { IotService } from './services/iotService';

dotenv.config();

// Initialize Services
BlockchainService.init();
ExpiryService.start();
IotService.start();

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
                console.log(`⛓️ Oracle: Match ${match.id} accepted. Executing Smart Contract...`);
                
                // Execute Blockchain Contract
                const txHash = await BlockchainService.logTrade(match.id, match.matched_kw, 4.0);
                
                if (txHash) {
                    await supabase
                        .from('matches')
                        .update({ 
                            contract_status: 'LOCKED',
                            blockchain_tx_hash: txHash 
                        })
                        .eq('id', match.id);
                    console.log(`🔒 Oracle: Contract LOCKED for Match ${match.id}`);
                }
            }
        }
    )
    .subscribe();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'SurplusGrid Backend is operational' });
});

/**
 * Trigger matching for a specific window.
 * This can be called via a Supabase Webhook when a window is inserted.
 */
app.post('/api/trigger-match', async (req, res) => {
    const { windowId } = req.body;

    if (!windowId) {
        return res.status(400).json({ error: 'Missing windowId' });
    }

    try {
        // Run matching logic in the background
        detectOverlaps(windowId);
        res.json({ message: 'Matching process initiated' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`⚡ [SurplusGrid Backend] Running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
export default app;

