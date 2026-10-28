/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL da Edge Function `contact`, ex.: https://<ref>.supabase.co/functions/v1/contact */
  readonly VITE_CONTACT_ENDPOINT?: string;
}
