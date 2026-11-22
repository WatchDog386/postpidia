# Deploying Postpidia on your own server

Everything runs on one machine: **PostgreSQL** (database), the **Node.js app** (website +
API, built with TanStack Start) and a **folder on disk** for uploaded footage.

```
Browser ──HTTPS──▶ Nginx/Caddy ──▶ Node app (port 3000) ──▶ PostgreSQL
                                        │
                                        └──▶ UPLOAD_DIR (raw footage + finished edits)
```

## Option A — Docker Compose (recommended)

```bash
cp .env.example .env        # set POSTGRES_PASSWORD, APP_URL, PAYSTACK_SECRET_KEY, SMTP_URL
docker compose up -d --build
```

The app applies database migrations automatically every time it starts. After you sign up
on the site, make yourself an editor:

```bash
docker compose exec app node scripts/make-admin.mjs you@example.com
```

Data lives in two Docker volumes: `pgdata` (database) and `uploads` (video files).

## Option B — Postgres + Node directly

Requires Node.js 22+ and PostgreSQL 14+.

```bash
# 1. Database
sudo -u postgres psql -c "create role postpidia login password 'change-me'"
sudo -u postgres psql -c "create database postpidia owner postpidia"

# 2. App
cp .env.example .env          # set DATABASE_URL etc.
npm ci
npm run build
npm run db:migrate
node --env-file=.env .output/server/index.mjs     # or: pm2 / systemd, see below
npm run db:make-admin -- you@example.com
```

Example systemd unit (`/etc/systemd/system/postpidia.service`):

```ini
[Unit]
Description=Postpidia
After=network.target postgresql.service

[Service]
WorkingDirectory=/srv/postpidia
ExecStartPre=/usr/bin/node --env-file=.env scripts/migrate.mjs
ExecStart=/usr/bin/node --env-file=.env .output/server/index.mjs
Restart=always
User=postpidia

[Install]
WantedBy=multi-user.target
```

## Reverse proxy (HTTPS + large uploads)

Uploads are streamed straight to disk, so multi-GB videos work — but your proxy must allow
large bodies. Nginx example:

```nginx
server {
  server_name postpidia.com;
  client_max_body_size 10G;          # match MAX_UPLOAD_BYTES
  proxy_request_buffering off;       # stream uploads to the app
  proxy_read_timeout 3600s;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Caddy does this with no extra settings: `postpidia.com { reverse_proxy 127.0.0.1:3000 }`.

`X-Forwarded-Proto` matters: session cookies are marked `Secure` when the site is served
over HTTPS.

## Environment variables

| Variable                 | Required     | Purpose                                                                      |
| ------------------------ | ------------ | ---------------------------------------------------------------------------- |
| `DATABASE_URL`           | yes          | `postgres://user:pass@host:5432/postpidia`                                   |
| `APP_URL`                | yes          | Public URL, used in password-reset emails                                    |
| `UPLOAD_DIR`             | no           | Where files are stored (default `./uploads`)                                 |
| `MAX_UPLOAD_BYTES`       | no           | Per-file limit (default 10 GB)                                               |
| `SMTP_URL` / `MAIL_FROM` | recommended  | Sends password-reset emails. Without it, links are printed to the server log |
| `PAYSTACK_SECRET_KEY`    | for payments | Paystack checkout + verification                                             |
| `PORT` / `HOST`          | no           | Default `3000` / all interfaces                                              |

## Backups

Back up both the database and the uploads folder:

```bash
pg_dump -Fc postpidia > postpidia-$(date +%F).dump
rsync -a /srv/postpidia/uploads/ backup-host:/backups/postpidia-uploads/
```

## Database

Schema: `db/migrations/*.sql` (plain SQL, applied in order by `scripts/migrate.mjs` and
tracked in `schema_migrations`). To change the schema, add a new numbered file such as
`002_add_invoices.sql` — never edit one that has already been applied.

| Table              | Purpose                                                       |
| ------------------ | ------------------------------------------------------------- |
| `users`            | Accounts (email, scrypt password hash, name, company, role)   |
| `sessions`         | Login sessions (only a SHA-256 of the cookie token is stored) |
| `password_resets`  | One-time, 1-hour reset tokens                                 |
| `projects`         | Editing orders: brief, status, editor notes                   |
| `project_files`    | Index of raw footage and deliverables stored in `UPLOAD_DIR`  |
| `project_messages` | Customer ↔ editor thread                                      |
| `reviews`          | Ratings, shown publicly once an editor approves them          |
| `contact_messages` | Homepage contact form                                         |
| `subscriptions`    | Verified Paystack payments                                    |

## Developing locally

```bash
cp .env.example .env     # DATABASE_URL pointing at a local Postgres
npm install
npm run db:migrate
npm run dev
```
