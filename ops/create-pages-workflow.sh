#!/usr/bin/env bash
set -euo pipefail

mkdir -p .github/workflows

cat > .github/workflows/deploy-pages.yml <<'YAML'
name: Deploy Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Checkout
        uses: actions/checkout@v6.0.2

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.13

      - name: Install dependencies
        run: bun install --frozen-lockfile --no-progress --registry=https://registry.npmjs.org

      - name: Run Bun tests
        run: bun test

      - name: Run Vitest
        run: bun run test

      - name: Build
        run: bun run build

      - name: Configure Pages
        uses: actions/configure-pages@v6.0.0
        with:
          enablement: true

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v5.0.0
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5.0.0
YAML

echo "Created .github/workflows/deploy-pages.yml"
