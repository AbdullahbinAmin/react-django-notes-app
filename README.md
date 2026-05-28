# Full-Stack Containerized Notes Application

A professional, production-ready full-stack notes application built with a **Django REST API** backend and a **React** frontend. The entire application is containerized using **Docker**, orchestrated via **Docker Compose**, and served securely through an **Nginx** reverse proxy.

Developed and maintained by [AbdullahbinAmin](https://github.com/AbdullahbinAmin).

---

## 🚀 Features

* **React Frontend**: A dynamic, responsive user interface to manage notes.
* **Django REST Backend**: Secure REST API handles note creation, retrieval, and storage.
* **MySQL Database**: Production-grade database container with persistent data volumes.
* **Nginx Reverse Proxy**: Automatically routes public web traffic and redirects HTTP to HTTPS.
* **SSL / HTTPS Configured**: Configured for encrypted HTTPS connections.
* **Complete Containerization**: Runs identically on local development (WSL) and production servers.

---

## 🛠️ Local Development Setup

To run the application locally on your computer (e.g., via WSL/Ubuntu) with the custom domain `abdullahbinamin.qzz.io`:

### 1. Build the React Frontend
Before launching containers, compile the React source code into static assets that Django serves:
```bash
cd mynotes
npm install
npm run build
cd ..
```

### 2. Configure Environment Variables
Create a `.env` file at the root level of the project with database configuration details:
```env
DB_NAME=test_db
DB_USER=root
DB_PASSWORD=root
DB_PORT=3306
DB_HOST=db_cont
```

### 3. Local DNS Mapping (Hosts File)
To access the app at `abdullahbinamin.qzz.io`, route the domain to your localhost:
* **Windows**: Add `127.0.0.1 abdullahbinamin.qzz.io` to `C:\Windows\System32\drivers\etc\hosts`.
* **WSL / Linux**: Add `127.0.0.1 abdullahbinamin.qzz.io` to `/etc/hosts`.

### 4. Boot the Containers
Run Docker Compose to build the custom Nginx/Django images, launch MySQL, apply migrations, and boot up:
```bash
docker-compose up --build
```
Open your browser and navigate to **`https://abdullahbinamin.qzz.io`** (accept the self-signed certificate warning for local development).

---

## 📦 Production Deployment

For deploying on a live cloud server (like AWS, DigitalOcean, or Linode):
1. Point your domain `abdullahbinamin.qzz.io` using an **A Record** to your server's Public IP.
2. Clone this repository on the VPS:
   ```bash
   git clone https://github.com/AbdullahbinAmin/django-notes-app.git
   ```
3. Run **Certbot** on the host server to generate free, trusted Let's Encrypt certificates:
   ```bash
   sudo certbot certonly --standalone -d abdullahbinamin.qzz.io
   ```
4. Mount the generated SSL keys `/etc/letsencrypt` inside the Nginx service in `docker-compose.yml` to enable public trusted HTTPS.
5. Start Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

