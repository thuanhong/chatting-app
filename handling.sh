#!/bin/sh
sudo docker container kill $(docker ps -a -q);
sudo docker container rm $(docker ps -a -q);
docker rm -vf $(docker ps -a -q)
docker rmi -f $(docker images -a -q)
echo 'y' | docker system prune -a --volumes
