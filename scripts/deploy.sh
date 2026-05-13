#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

git pull
npm ci
npm run build

mkdir -p .next/standalone/.next
cp -R public .next/standalone/
cp -R .next/static .next/standalone/.next/

pm2 reload ecosystem.config.cjs --env production
pm2 save
