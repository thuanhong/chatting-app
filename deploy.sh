#!/bin/sh
cd backend && npm run build
cd ..
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "pkill node"
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "rm -rf dist"
scp -r -i ~/key-pair-app-chat.pem ./backend/dist azureuser@20.55.61.85:/home/azureuser
scp -r -i ~/key-pair-app-chat.pem ./backend/tsconfig.build.json azureuser@20.55.61.85:/home/azureuser
scp -r -i ~/key-pair-app-chat.pem ./backend/package.json azureuser@20.55.61.85:/home/azureuser
scp -r -i ~/key-pair-app-chat.pem ./backend/.env azureuser@20.55.61.85:/home/azureuser
scp -r -i ~/key-pair-app-chat.pem ./backend/ormconfig.js azureuser@20.55.61.85:/home/azureuser
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "npm run start:prod"
