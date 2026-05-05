# 🏛️ SurplusGrid: Database Migration & Hardening Encyclopedia
## Final Step-by-Step Handbook for the Database & Supabase Lead

This document is the **Absolute Authority** on the database-to-backend synchronization. We are moving from a "Simple Storage Bucket" to an **"Autonomous Event Engine."** Follow this surgical checklist to ensure every table and policy is demo-ready.

---

## 🔍 1. The "Before vs After" Evolution
| Feature | Old State (Prototype) | New State (Autonomous Engine) |
| :--- | :--- | :--- |
| **Matching** | Manual / Static | **Reactive (Triggered by Webhooks)** |
| **Inventory** | Static predicted_kw | **Atomic (Auto-deducted during matches)** |
| **Transactions** | Basic records | **Blockchain Verified (contract_status)** |
| **Security** | Open / Permissive | **Hardened (Service-Role RLS Policies)** |

---

## 🛠️ 2. Surgical Migration Checklist (Run these in order)

### 🔹 Step 1: Hardening the `surplus_windows` Table
*   **The Change:** Ensure the database protects the inventory from "Over-Selling."
*   **The SQL:**
    ```sql
    -- 1. Add the Atomic Constraint
    ALTER TABLE surplus_windows 
    ADD CONSTRAINT inventory_non_negative CHECK (predicted_kw >= 0);

    -- 2. Add Performance Indexes
    CREATE INDEX idx_window_matching ON surplus_windows (date, zone, start_time, end_time);
    ```

### 🔹 Step 2: Hardening the `matches` Table
*   **The Change:** Ensure all transaction math is stored correctly.
*   **The SQL:**
    ```sql
    -- 1. Ensure these columns exist and are correctly typed
    ALTER TABLE matches 
    ADD COLUMN IF NOT EXISTS consumer_savings_inr NUMERIC,
    ADD COLUMN IF NOT EXISTS carbon_offset_tco2 NUMERIC,
    ADD COLUMN IF NOT EXISTS contract_status TEXT DEFAULT 'NONE';

    -- 2. Add Performance Indexes
    CREATE INDEX idx_match_audit ON matches (status, contract_status, consumer_id);
    ```

### 🔹 Step 3: Implementing Service-Role Security (RLS)
*   **The Change:** Allow the backend to bypass standard user restrictions for autonomous trades.
*   **The SQL:**
    ```sql
    ALTER TABLE surplus_windows ENABLE ROW LEVEL SECURITY;

    -- Allow the backend service to update inventory
    CREATE POLICY "Backend service can update inventory" 
    ON surplus_windows 
    FOR UPDATE 
    USING (auth.role() = 'service_role') 
    WITH CHECK (predicted_kw >= 0);
    ```

### 🔹 Step 4: Configuring the "Reflex" (Webhook)
*   **The Change:** Notify the backend instantly when a window is added.
*   **Action:** 
    1.  Go to Supabase Dashboard > **Database** > **Webhooks**.
    2.  Enable Webhooks.
    3.  Create a hook for `INSERT` on `surplus_windows`.
    4.  **Target URL:** `http://localhost:5001/api/webhooks/surplus-window`

---

## 🔍 3. The "Fix-it" Auditor's Checklist
| Potential Issue | SQL Verification | Expected Result |
| :--- | :--- | :--- |
| **Over-Selling** | Try setting `predicted_kw = -10` | Database must **Reject** the change |
| **Missing Stats** | Check `reports` table exists | Must have `total_savings_inr` |
| **Matching Speed** | Check `pg_indexes` | `idx_window_matching` must exist |
| **Blockchain Trust**| Check `matches` table | `contract_status` must be `NONE/LOCKED` |

---

## 🏁 Final Goal
With these surgical changes, our database will be a **Fortress.** It will not only store data but will actively enforce the marketplace rules. Everything is on `master`—let’s lock this down! 🚀🗄️🥇
