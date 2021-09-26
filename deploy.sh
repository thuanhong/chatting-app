#!/bin/sh
docker build -t thuan324/chatting-app:chatting-app-backend -f Dockerfile.backend.prod ./backend
docker push thuan324/chatting-app:chatting-app-backend

