#!/bin/sh
docker build -t thuan324/chatting-app:chatting-app-database -f Dockerfile.db .
docker build -t thuan324/chatting-app:chatting-app-frontend -f Dockerfile.frontend.prod ./frontend
docker build -t thuan324/chatting-app:chatting-app-backend -f Dockerfile.backend.prod ./backend

docker push thuan324/chatting-app:chatting-app-database
docker push thuan324/chatting-app:chatting-app-frontend
docker push thuan324/chatting-app:chatting-app-backend

