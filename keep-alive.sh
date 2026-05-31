#!/bin/bash
cd /home/z/my-project
while true; do
  NODE_OPTIONS="--max-old-space-size=2048" node node_modules/.bin/next dev -p 3000 2>&1
  echo "Server crashed at $(date), restarting in 3s..." >> /home/z/my-project/crash.log
  sleep 3
done
