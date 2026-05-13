#!/usr/bin/env bash
set -euo pipefail

cat <<'EOF'
Deploy is handled by GitHub Actions.

Push to main to build the Next.js standalone artifact in CI and deploy it to
the Timeweb Cloud VPS through nginx + PM2.
EOF

exit 1
