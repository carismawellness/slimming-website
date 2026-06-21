#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Carisma Slimming — auto-deploy
#
# Pushes any *committed* changes on the current branch to `main`, which Vercel
# auto-deploys to production (slimming-seven.vercel.app / carismaslimming.com).
#
# Wired as a Claude Code **Stop** hook so changes go live automatically after a
# turn — no "want me to push?" prompt. Vercel build-gates production, so a commit
# that fails to build never replaces the live site.
#
# Deliberately PUSH-ONLY: it never runs `git add`/`git commit`, so uncommitted
# or in-progress work is left untouched and is never deployed by surprise.
# No-ops when there is nothing new to push.
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

# Resolve the repo root from this script's location (.claude/ -> repo root).
REPO="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/.." && pwd)"
cd "$REPO" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

# Refresh our view of origin/main so the ahead-check is accurate.
git fetch origin main --quiet 2>/dev/null || true

# Only push when the current HEAD has commits that origin/main doesn't.
if [ -n "$(git log origin/main..HEAD --oneline 2>/dev/null)" ]; then
  # Background the push so the hook returns immediately; Vercel handles deploy.
  git push origin HEAD:main >/dev/null 2>&1 &
fi

exit 0
