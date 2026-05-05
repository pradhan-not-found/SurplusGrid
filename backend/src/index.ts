import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './lib/supabase';
import { detectOverlaps } from './services/matchingEngine';
import { BlockchainService } from './services/blockchainService';

dotenv.config();

// Initialize Services
BlockchainService.init();

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

