/** Shapes returned by the server functions (rows from PostgreSQL). Safe to import anywhere. */

export type Role = "customer" | "admin";

export type User = {
  id: string;
  email: string;
  full_name: string;
  company: string;
  phone: string;
  role: Role;
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

export type ProjectListItem = Project & {
  file_count: number;
  customer_name: string;
  customer_email: string;
  customer_company: string;
};

export type ProjectFile = {
  id: string;
  project_id: string;
  uploaded_by: string | null;
  kind: "raw" | "deliverable";
  file_name: string;
  size_bytes: number;
  mime_type: string | null;
  created_at: string;
};

export type ProjectMessage = {
  id: string;
  project_id: string;
  author_id: string | null;
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

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  handled: boolean;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string | null;
  email: string;
  plan: string;
  billing: string;
  amount: number;
  reference: string;
  status: string;
  paid_at: string;
  created_at: string;
};
