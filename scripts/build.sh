#!/bin/bash

# Build the files and copy the neccessary files

npm run clear && mkdir dist && babel src -d dist

exit 0
