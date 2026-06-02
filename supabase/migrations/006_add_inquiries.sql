-- Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  phone        text,
  event_date   text,
  location     text,
  event_type   text,
  guest_count  text,
  story        text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can insert an inquiry (landing page)
CREATE POLICY "Anyone can insert inquiries"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can select inquiries
CREATE POLICY "Admins can view inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (select auth.uid())
        AND p.role = 'admin'
    )
  );

-- Grant select and insert to anon and authenticated, and all to service_role/postgres
GRANT SELECT, INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;
GRANT ALL ON public.inquiries TO postgres;

