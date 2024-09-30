#!/bin/bash

# systemctl start mongodb.service

sn=devCon
cd ~/dev-connect/
tmux new-session -s "$sn" -n etc -d "nvim .; exec zsh"
cd ~/dev-connect/client
tmux new-window -t "$sn:2" -n "client" "npm run dev"
cd ~/dev-connect/server
tmux new-window -t "$sn:3" -n "server"  "npm run server"

tmux select-window -t "$sn:1"
tmux -2 attach-session -t "$sn"
