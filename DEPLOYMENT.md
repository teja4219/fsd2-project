# Hosting the Node.js version

## Recommended easiest hosting: Render Web Service with persistent disk

1. Push the repository to GitHub.
2. In Render, create a **Web Service** from the repository and set the root directory to `node-app`.
3. Select the Node runtime. Build command: `npm install` (there are no external dependencies). Start command: `npm start`.
4. Add environment variables: `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. Use a long random session secret and a unique administrator password. After the first successful start and account creation, remove the bootstrap admin variables.
5. Attach a persistent disk to the service. Set the disk mount path to `/opt/render/project/src/data` only if you modify database path and storage paths accordingly; Render's service root layout varies, so verify the mounted path. Better use a mounted directory dedicated to both database and uploads and configure `DATA_DIR`/`UPLOAD_DIR` before deployment.
6. Deploy and check logs, then verify login, CRUD and PDF upload/download.

**Important:** the current local code writes to `node-app/data` and `node-app/uploads/private`. A Render instance without a persistent disk will lose these on redeploy/restart. Configure the persistent disk paths before using for real data. For multi-instance scaling, replace SQLite with a network database and local uploads with object storage.

Render supports Docker for PHP but has native Node runtime; use this Node project, not the PHP root app.
