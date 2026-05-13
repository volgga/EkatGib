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

```bash
git clone <repo-url> /var/www/ekat-gib
cd /var/www/ekat-gib
npm ci
NEXT_PUBLIC_SITE_URL=https://gibadullina-psychology.ru npm run build
mkdir -p .next/standalone/.next
cp -R public .next/standalone/
cp -R .next/static .next/standalone/.next/
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

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

```bash
cd /var/www/ekat-gib
NEXT_PUBLIC_SITE_URL=https://gibadullina-psychology.ru ./scripts/deploy.sh
```
