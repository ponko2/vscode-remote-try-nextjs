#!/usr/bin/env bash

set -euo pipefail

git config --global --add safe.directory /workspaces/vscode-remote-try-nextjs

npm uninstall -g pnpm
sudo corepack enable pnpm
corepack install --global pnpm
pnpm config set store-dir ~/.local/share/pnpm/store

pnpm install --force
pnpm exec prisma migrate dev
