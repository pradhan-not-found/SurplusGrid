-- Add available_kw to surplus_windows to track remaining power for partial matches
ALTER TABLE public.surplus_windows 
ADD COLUMN IF NOT EXISTS available_kw NUMERIC;

-- Initialize available_kw with predicted_kw for existing records
UPDATE public.surplus_windows 
SET available_kw = predicted_kw 
WHERE available_kw IS NULL;

-- Ensure available_kw is not null for future records
ALTER TABLE public.surplus_windows 
ALTER COLUMN available_kw SET NOT NULL;
