#!/bin/sh
ssh -i key-pair-app-chat.pem -fNg -L 3308:127.0.0.1:3306 azureuser@chatting-app.eastus.cloudapp.azure.com
