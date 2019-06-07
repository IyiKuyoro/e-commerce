#!/bin/bash

# Build the files and copy the neccessary files

npm run clear && mkdir dist && babel src -d dist

# Check that the dist folder has been created
if [[ ! -d "$(pwd)/dist" ]]; then
  echo "dist directory DOES NOT exists."
  exit 1
fi

# Copy database setup
if cp -av $(pwd)/src/configs/database.json $(pwd)/dist/configs; then
  echo "Copied src/configs/database.json to dist/config"
else
  echo "Could not copy src/config/database.json"
  exit 1
fi

exit 0
