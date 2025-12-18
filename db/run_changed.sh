#!/bin/bash
set -e

echo "Detecting changed SQL files..."

CHANGED_FILES=$(git diff --name-only origin/main...HEAD | grep '^db/.*\.sql$' || true)

if [ -z "$CHANGED_FILES" ]; then
  echo "No DB changes detected"
  exit 0
fi

for file in $CHANGED_FILES; do
  echo "Running: $file"
  psql "$DATABASE_URL" -f "$file"
done

echo "DB changes applied successfully"
