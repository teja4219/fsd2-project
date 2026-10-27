# Digital Notice Board (Node.js version)

Responsive institutional notice board built with HTML, CSS, browser JavaScript, and Node.js. This is a separate version from the PHP app in the parent folder.

## Features

- Public board with search, category/priority filters, pagination, pinned items and publication rules.
- Notice details and PDF attachment downloads.
- Staff login, dashboard statistics, create/edit/publish/unpublish/pin/delete actions.
- Session cookies, CSRF tokens, password hashing (scrypt), prepared SQLite statements, escaped output, PDF type/size checks.
- Local persistence using Node's built-in SQLite module; no XAMPP or npm packages are required.

## Run locally

Requires Node.js 22.5 or later (SQLite support is built in; on Node 22 it may show an experimental warning).

```sh
cd node-app
ADMIN_EMAIL=admin@example.edu ADMIN_PASSWORD='use-a-long-unique-password' SESSION_SECRET='use-a-random-secret' npm start
```

Open `http://localhost:3000`. The first run creates the initial admin if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set. These values are only used to bootstrap the first account; remove or change them after first startup. The database file is created at `data/notice-board.sqlite`. Attachments are stored in `uploads/private/` and downloaded through a route that checks the notice is public/live.

macOS/Linux can export variables first:

```sh
export ADMIN_EMAIL='admin@example.edu'
export ADMIN_PASSWORD='use-a-long-unique-password'
export SESSION_SECRET="$(openssl rand -hex 32)"
npm start
```

On PowerShell:

```powershell
$env:ADMIN_EMAIL='admin@example.edu'
$env:ADMIN_PASSWORD='use-a-long-unique-password'
$env:SESSION_SECRET='use-a-long-random-secret'
npm start
```

## Deployment

This local version uses a SQLite file and local filesystem for PDFs. Those require persistent storage on the hosting provider; do not deploy this exact storage setup to an ephemeral serverless filesystem. For deployment, use a Node host with a persistent disk, or adapt the app to a hosted database (for example MySQL/PostgreSQL) and object storage. Vercel functions do not provide persistent local SQLite/uploads, so this version is ready to run locally but needs external persistent database and file storage adapters before production deployment there.

## Routes

- `/` public board
- `/notice?id=1` notice details
- `/login`, `/logout`
- `/admin/dashboard`, `/admin/manage-notices`, `/admin/add-notice`, `/admin/edit-notice?id=1`
- `/download?id=1`

The first admin can be created by setting `ADMIN_EMAIL` and `ADMIN_PASSWORD` before the first run. Do not commit these secrets or the SQLite database. Keep backups of both the database and private attachments.
