#!/bin/bash
cd /home/kavia/workspace/code-generation/communityconnect-hub-33712-9b10e706/communityconnect_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

