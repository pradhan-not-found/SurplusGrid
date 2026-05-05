import { ethers } from 'ethers';
import { supabase } from '../lib/supabase';

// Configuration from .env
const RPC_URL = process.env.BLOCKCHAIN_RPC_URL || 'http://localhost:8545';
const PRIVATE_KEY = process.env.BLOCKCHAIN_PRIVATE_KEY;

export class BlockchainService {
    private static provider: ethers.JsonRpcProvider | null = null;
    private static wallet: ethers.Wallet | null = null;

    static init() {
        if (!PRIVATE_KEY) {
            console.warn('⚠️ Blockchain: No PRIVATE_KEY found. Transactions will be simulated for demo.');
            return;
        }
        try {
            this.provider = new ethers.JsonRpcProvider(RPC_URL);
            this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
            console.log('✅ Blockchain: Connected to Ethereum Network:', RPC_URL);
        } catch (error) {
            console.error('❌ Blockchain: Connection failed:', error);
        }
    }

    /**
     * Logs a completed energy trade onto the blockchain.
     * For a private Geth network, we can send a transaction to a simple 
     * Registry contract or even a simple value transfer with data.
     */
    static async logTrade(matchId: string, matchedKw: number, price: number) {
        console.log(`[Blockchain] Recording match ${matchId} on-chain...`);

        if (!this.wallet) {
            // Mock transaction for demo if no private key is provided
            const mockHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
            console.log(`[Blockchain] SIMULATED TX HASH: ${mockHash}`);
            return mockHash;
        }

        try {
            // Prepare the trade metadata
            const tradeData = JSON.stringify({
                matchId,
                matchedKw,
                price,
                timestamp: new Date().toISOString()
            });

            // Send a simple transaction with metadata in the 'data' field
            // Note: In a real production app, you'd use a Smart Contract.
            const tx = await this.wallet.sendTransaction({
                to: this.wallet.address, // Sending to self to record data
                value: 0,
                data: ethers.hexlify(ethers.toUtf8Bytes(tradeData))
            });

            console.log(`✅ Blockchain: Trade recorded! Hash: ${tx.hash}`);
            return tx.hash;

        } catch (error) {
            console.error('❌ Blockchain: Logging failed:', error);
            return null;
        }
    }
}
