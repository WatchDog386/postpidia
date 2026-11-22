import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** False when the VITE_SUPABASE_* env vars are missing (e.g. a fresh clone without .env). */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[postpidia] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Accounts, uploads and reviews are disabled until you add them to .env.",
  );
}

// createClient throws on an empty URL, which used to crash every page at import time.
// Fall back to a placeholder so the marketing pages still render without config.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: typeof window !== "undefined",
    },
  },
);

export const SUPABASE_URL = supabaseUrl ?? "";
export const SUPABASE_ANON_KEY = supabaseAnonKey ?? "";

export type Subscription = {
  id?: string;
  user_id?: string | null;
  email: string;
  plan: string;
  billing: string;
  amount: number;
  reference: string;
  status: string;
  paid_at: string;
  created_at?: string;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  role: "customer" | "admin";
  created_at: string;
};

export type ProjectStatus =
  | "submitted"
  | "in_review"
  | "editing"
  | "delivered"
  | "revision_requested"
  | "completed"
  | "cancelled";

export type Project = {
  id: string;
  customer_id: string;
  title: string;
  platform: string;
  video_type: string;
  aspect_ratio: string;
  target_length: string | null;
  style_notes: string | null;
  music_preference: string | null;
  footage_link: string | null;
  deadline: string | null;
  status: ProjectStatus;
  editor_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectFile = {
  id: string;
  project_id: string;
  uploaded_by: string;
  kind: "raw" | "deliverable";
  bucket: "raw-footage" | "deliverables";
  path: string;
  file_name: string;
  size_bytes: number | null;
  mime_type: string | null;
  created_at: string;
};

export type ProjectMessage = {
  id: string;
  project_id: string;
  author_id: string;
  body: string;
  from_editor: boolean;
  created_at: string;
};

export type Review = {
  id: string;
  user_id: string;
  project_id: string | null;
  display_name: string;
  company: string | null;
  rating: number;
  title: string | null;
  body: string;
  approved: boolean;
  created_at: string;
};
