#! /bin/bash
npm run build
docker build -t benawad/slack-clone-server:latest .
docker push benawad/slack-clone-server:latest 