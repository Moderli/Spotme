-- ============================================================
-- Migration: Fix Profiles Plan Default & Check Constraint
-- Resolves check constraint violation during signup/auth insert
-- ============================================================

-- 1. Drop the restrictive check constraint profiles_plan_check from profiles table
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_plan_check;

-- 2. Add an updated check constraint that supports both the new pricing redesign plan names
--    ('solo', 'studio', 'agency') and original plan names used by frontend/API ('free', 'pro', 'unlimited')
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('free', 'pro', 'unlimited', 'solo', 'studio', 'agency', 'enterprise'));

-- 3. Update the default value of the plan column to 'free' (to match Next.js defaults)
ALTER TABLE public.profiles
  ALTER COLUMN plan SET DEFAULT 'free';

-- 4. Map any existing database records to match the expected values for the frontend
--    (Convert 'solo' -> 'free', 'studio' -> 'unlimited', 'agency' -> 'unlimited')
UPDATE public.profiles SET plan = 'free' WHERE plan = 'solo';
UPDATE public.profiles SET plan = 'unlimited' WHERE plan = 'studio';
UPDATE public.profiles SET plan = 'unlimited' WHERE plan = 'agency';
