# Deploy to Timeweb Cloud VPS

Production domain: `https://gibadullina-psychology.ru`

## Server Setup

```bash
sudo apt update
sudo apt install -y curl git nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## First Deploy

Build happens in GitHub Actions. The VPS should only receive and run the
prepared standalone artifact.

```bash
sudo mkdir -p /var/www/releases
sudo chown -R $USER:$USER /var/www/releases
pm2 startup
```

Then push to `main` and let GitHub Actions create `/var/www/ekat-gib`.

## Nginx

Create `/etc/nginx/sites-available/ekat-gib`:

```nginx
server {
    listen 80;
    server_name gibadullina-psychology.ru www.gibadullina-psychology.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/ekat-gib /etc/nginx/sites-enabled/ekat-gib
sudo nginx -t
sudo systemctl reload nginx
```

## SSL

```bash
sudo certbot --nginx -d gibadullina-psychology.ru -d www.gibadullina-psychology.ru
```

## Updates

Push to `main`. GitHub Actions builds the Next.js standalone artifact, uploads
`ekat-gib-${GITHUB_SHA}.tar.gz` to `/tmp`, verifies its checksum, extracts it to
`/var/www/releases/ekat-gib-${GITHUB_SHA}`, atomically updates
`/var/www/ekat-gib`, reloads PM2 with updated env, and keeps the latest 3
releases.
