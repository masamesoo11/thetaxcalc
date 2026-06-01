#!/bin/bash
# Deploy thetaxcalc to Cloudflare Pages
# 
# You need to set CLOUDFLARE_ACCOUNT_ID before running this script.
# Find your account_id at: https://dash.cloudflare.com -> URL contains the account_id
# Example: https://dash.cloudflare.com/YOUR_ACCOUNT_ID/pages/view/thetaxcalc
#
# Usage: CLOUDFLARE_ACCOUNT_ID=your_account_id bash deploy.sh

set -e

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "❌ Error: CLOUDFLARE_ACCOUNT_ID is not set"
  echo ""
  echo "Find your account_id:"
  echo "1. Go to https://dash.cloudflare.com"
  echo "2. The URL will be: https://dash.cloudflare.com/YOUR_ACCOUNT_ID/..."
  echo "3. Copy the account_id from the URL"
  echo ""
  echo "Then run: CLOUDFLARE_ACCOUNT_ID=your_account_id bash deploy.sh"
  exit 1
fi

echo "🔨 Building for Cloudflare Pages..."
npx @cloudflare/next-on-pages

echo "🔧 Patching Worker with security & indexing headers..."
node scripts/patch-worker-headers.js

echo "📦 Deploying to Cloudflare Pages..."
CLOUDFLARE_API_TOKEN=REPLACE_WITH_TOKEN \
CLOUDFLARE_ACCOUNT_ID=$CLOUDFLARE_ACCOUNT_ID \
npx wrangler pages deploy .vercel/output/static --project-name=thetaxcalc

echo "✅ Deployment complete!"
echo "🌐 Visit https://thetaxcalc.com to verify"
