#!/bin/sh
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "pkill node"
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "sudo rm -rf backend/"
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "mkdir backend/"

scp -r -i ~/key-pair-app-chat.pem ./backend/dist azureuser@20.55.61.85:/home/azureuser/backend/dist
scp -r -i ~/key-pair-app-chat.pem ./backend/tsconfig.build.json azureuser@20.55.61.85:/home/azureuser/backend
scp -r -i ~/key-pair-app-chat.pem ./backend/package.json azureuser@20.55.61.85:/home/azureuser/backend
scp -r -i ~/key-pair-app-chat.pem ./backend/.env azureuser@20.55.61.85:/home/azureuser/backend
scp -r -i ~/key-pair-app-chat.pem ./backend/ormconfig.js azureuser@20.55.61.85:/home/azureuser/backend
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "npm install --prefix backend/"
ssh -i ~/key-pair-app-chat.pem azureuser@20.55.61.85 "npm run start --prefix backend/ &"
