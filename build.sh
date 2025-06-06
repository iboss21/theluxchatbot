#!/bin/bash
set -e

# Print current directory and files for debugging
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la

# Run the rename script
echo "Running rename script..."
node scripts/rename-conflicting-files.js

# Run the Next.js build
echo "Running Next.js build..."
npm run build

