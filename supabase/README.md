# Postpidia backend (Supabase)

The app talks to Supabase directly from the browser (auth, database, storage), with
Row Level Security deciding who can see and change what. Payments are verified on the
server (`src/lib/paystack-server.ts`).

## One-time setup

1. **Run the migration.** Open Supabase → SQL Editor, paste the contents of
   `migrations/20261122000000_video_editing_platform.sql` and run it. It is idempotent,
   so running it again is safe.
2. **Environment variables** (locally in `.env`, on Vercel under Project Settings →
   Environment Variables):
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` – public, used by the browser
   - `SUPABASE_SERVICE_ROLE_KEY` – server only, saves verified subscriptions
   - `PAYSTACK_SECRET_KEY` – server only
3. **Auth settings** (Authentication → URL Configuration): set the Site URL to your
   domain and add `https://your-domain/dashboard` and `https://your-domain/account` as
   redirect URLs (used by email confirmation and password reset).
4. **Make yourself an editor** after signing up on the site:
   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```
   Editors get the **Studio** (`/admin`): project queue, review moderation, contact inbox,
   and editor controls on each project (status, notes, uploading finished videos).
5. **Upload size.** Buckets allow 5 GB per file, but the Supabase Free plan caps uploads
   at 50 MB per file. Raise it under Storage → Settings on a paid plan. Customers can
   always paste a Drive/Dropbox/WeTransfer link instead.

## Customer flow

1. Create an account (`/auth`) → profile row is created automatically.
2. Start a project (`/upload`): brief + raw footage → files go to the private
   `raw-footage` bucket under `{user_id}/{project_id}/`.
3. Editors move it through *Submitted → In review → Editing → Delivered*, upload edits to
   the `deliverables` bucket, and chat on the project page.
4. Customer downloads the edits, then **Approves** (→ Completed) or **Requests a
   revision**.
5. Customer leaves a review (`/reviews`). Reviews appear publicly — on `/reviews` and the
   homepage — once an editor approves them.

## Data model

| Table | Purpose |
| --- | --- |
| `profiles` | Name, company, phone, `role` (`customer` / `admin`) |
| `projects` | Editing orders with brief and status |
| `project_files` | Raw footage and deliverables (pointers to storage objects) |
| `project_messages` | Customer ↔ editor thread per project |
| `reviews` | Ratings + text, `approved` flag for moderation |
| `contact_messages` | Homepage contact form submissions |
| `subscriptions` | Verified Paystack payments |
