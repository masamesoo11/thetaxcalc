#!/bin/bash
cd /home/z/my-project
export NODE_OPTIONS="--max-old-space-size=2048"
while true; do
  echo "$(date): Starting Next.js server..." >> /home/z/my-project/server.log
  node node_modules/.bin/next start -p 3000 2>&1 >> /home/z/my-project/server.log
  EXIT=$?
  echo "$(date): Server exited with code $EXIT, restarting in 2s..." >> /home/z/my-project/server.log
  sleep 2
done
