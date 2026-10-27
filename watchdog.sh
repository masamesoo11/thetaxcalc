#!/bin/bash
# watchdog.sh — Dev-server health guardian for TheTaxCalc sandbox
# Detects BOTH silent-exit AND hung states (supervisor.js only catches exit)
# Only acts when port 3000 stops answering HTTP 3 consecutive checks (~45s),
# so normal recompiles (which stay responsive) never trigger a restart.

LOG=/home/z/my-project/watchdog.log
URL=http://localhost:3000/
FAILS=0

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG"; }

log "watchdog started (pid $$, checks every 15s, restart after 3 consecutive failures)"

while true; do
  if curl -s -o /dev/null --max-time 10 "$URL"; then
    FAILS=0
  else
    FAILS=$((FAILS+1))
    log "health-check FAILED ($FAILS/3)"
    if [ "$FAILS" -ge 3 ]; then
      log "=== PORT 3000 DEAD — restarting dev server ==="
      # Kill only processes that belong to the Next dev server tree.
      # Killing 'next dev' + 'next-server' makes the 'bun run dev' parent exit naturally.
      pkill -f 'next dev -p 3000' 2>/dev/null
      pkill -f 'next-server' 2>/dev/null
      sleep 3
      # SIGKILL fallback for processes that ignored SIGTERM (hung state)
      pkill -9 -f 'next dev -p 3000' 2>/dev/null
      pkill -9 -f 'next-server' 2>/dev/null
      sleep 2
      # Start a fresh dev server exactly the way the platform does
      cd /home/z/my-project || exit 1
      nohup bun run dev >> /home/z/my-project/dev.log 2>&1 &
      log "restart issued (bun pid $!) — giving it 25s to boot before resuming checks"
      FAILS=0
      sleep 25
    fi
  fi
  sleep 15
done
