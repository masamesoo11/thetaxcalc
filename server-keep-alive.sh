#!/bin/bash
cd /home/z/my-project

while true; do
  echo "[$(date)] Starting next dev server..." >> /home/z/my-project/server-keep-alive.log
  node node_modules/.bin/next dev -p 3000 2>&1 >> /home/z/my-project/server-keep-alive.log
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE, restarting in 2s..." >> /home/z/my-project/server-keep-alive.log
  sleep 2
done
