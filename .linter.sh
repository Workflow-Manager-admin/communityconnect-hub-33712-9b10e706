#!/bin/bash
cd /home/kavia/workspace/code-generation/copy-of-commut-hub-33712-communityconnect-hub-33712-9b10e706-35452/communityconnect_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

