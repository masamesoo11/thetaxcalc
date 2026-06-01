#!/bin/bash
cd /home/z/my-project
while true; do
  bun run dev 2>&1
  echo "Server crashed at $(date), restarting in 3s..." >> /home/z/my-project/server-crash.log
  sleep 3
done
