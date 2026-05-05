# 🏛️ SurplusGrid: The Frontend Auditor's Encyclopedia
## Final Search-and-Fix Handbook for the UI/UX Lead

This document is the **Absolute Authority** on the frontend-to-backend synchronization. We are moving from a "Mock Prototype" to a **"Hard-Wired Marketplace."** Follow this surgical checklist to ensure every component is demo-ready.

---

## 🔍 1. Component Audit: `ProducerWindows.tsx` (Supply Entry)
### 🛠️ What needs to be Fixed/Modified:
*   **The Problem:** The form currently allows any date/time.
*   **The Fix:** 
    1.  Add a check in the `handleSubmit` function: `if (endTime <= startTime) { alert("Invalid Time Range"); return; }`
    2.  **Payload Sync:** Ensure the keys in your `supabase.insert()` call match the database columns exactly:
        *   `producer_id`: `user.id`
        *   `predicted_kw`: `Number(surplus)`
        *   `price_per_kw`: `Number(price)`
        *   `zone`: `selectedZone`

---

## 🔍 2. Component Audit: `ConsumerAlerts.tsx` (Real-time Matches)
### 🛠️ What needs to be Fixed/Modified:
*   **The Problem:** The list currently only updates on page refresh.
*   **The Fix:** 
    1.  **Subscription:** Add a `useEffect` that listens for `matches` INSERT events.
    2.  **Logic:** 
        ```typescript
        const subscription = supabase
          .from('matches')
          .on('INSERT', (payload) => {
             // 1. Alert the user
             toast.success("New Energy Match Found!");
             // 2. Update local state
             setMatches([payload.new, ...matches]);
          })
          .subscribe();
        ```
*   **The "Accept" Button:** Ensure clicking "Accept" calls an `update` on the `matches` table to set `status = 'accepted'`. **This is the trigger for the Blockchain Oracle.**

---

## 🔍 3. Component Audit: `ConsumerOverview.tsx` (The Stats Layer)
### 🛠️ What needs to be Fixed/Modified:
*   **The Problem:** Stats like "Total Savings" and "Carbon Offset" are likely hardcoded placeholders.
*   **The Fix:** 
    1.  **Data Fetch:** Call `supabase.from('reports').select('*')` on mount.
    2.  **Mapping:** Map the `total_savings_inr` and `total_carbon_offset_tco2` from the DB to your `StatsCard` components.
    3.  **The Banner:** Ensure the **Latency Banner** I implemented is using the live `performance.now()` RTT (Round Trip Time). If it stays at "0ms," it’s not connected to the `api/edge-simulation` endpoint.

---

## 🔍 4. Visual Fix: The Blockchain "Proof" Badge
### 🛠️ What needs to be Added:
*   **Requirement:** We need to visually prove the decentralized handshake.
*   **Component:** The `MatchCard` inside `ConsumerAlerts`.
*   **The Logic:**
    *   Find the `status` prop.
    *   If `match.contract_status === 'LOCKED'`, render a badge with a neon-green glow:
        ```jsx
        <span className="badge-glow-green">⛓️ Blockchain Verified</span>
        ```
    *   This tells the judge: "The backend Oracle has successfully locked this trade on-chain."

---

## 🧪 5. The "Auditor's Final Walkthrough"
To confirm your work is 100% correct:
1.  **Step 1:** Open the Browser and Terminal side-by-side.
2.  **Step 2:** Add a Producer window. Watch the terminal for `🔔 [WEBHOOK RECEIVED]`.
3.  **Step 3:** Watch the Consumer Dashboard. The new match should pop up **instantly** without you touching the mouse.
4.  **Step 4:** Accept the match. Watch the terminal for `⛓️ Oracle: Executing Smart Contract...`.

**If all 4 steps work, we have won the competition.** 🚀🎨🥇
