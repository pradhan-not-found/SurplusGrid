import { detectOverlaps } from './services/matchingEngine';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
    const testWindowId = 'REPLACE_WITH_ACTUAL_WINDOW_ID';
    console.log('--- Starting Local Matching Test ---');
    await detectOverlaps(testWindowId);
    console.log('--- Test Finished ---');
}

test();
