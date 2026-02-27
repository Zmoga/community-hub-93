
CREATE TABLE public.server_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  players integer NOT NULL DEFAULT 0,
  max_players integer NOT NULL DEFAULT 128,
  online boolean NOT NULL DEFAULT false,
  server_name text
);

-- Allow anyone to read stats (public data)
ALTER TABLE public.server_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read server stats"
  ON public.server_stats FOR SELECT
  TO anon, authenticated
  USING (true);

-- Index for time-range queries
CREATE INDEX idx_server_stats_recorded_at ON public.server_stats (recorded_at DESC);
