#!/bin/bash

# Sets up your develeopment environment

# Add script run permission
chmod u+x ./scripts/cev.sh || echo "Could not set permission on cev.sh"

# Scripts to run
./scripts/cev.sh

exit 0
