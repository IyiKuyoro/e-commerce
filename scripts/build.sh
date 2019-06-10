#!/bin/bash

# Build the files and copy the neccessary files

npm run clear && mkdir dist && babel src --ignore **/__tests__/**,**/__mocks__/** -d dist

exit 0
