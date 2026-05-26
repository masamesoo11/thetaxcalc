#!/bin/bash
cd /home/z/my-project
export NODE_OPTIONS="--max-old-space-size=256"
while true; do
  node server.js 2>&1
  echo "Server exited at $(date), restarting in 2s..." >&2
  sleep 2
done
