#!/bin/bash

# systemctl start mongodb.service

sn=devCon
tmux new-session -s "$sn" -n etc -d "nvim .; exec zsh"
cd client
tmux new-window -t "$sn:2" -n "client" "npm run dev"
cd ../server
tmux new-window -t "$sn:3" -n "server"  "npm run server"

tmux select-window -t "$sn:1"
tmux -2 attach-session -t "$sn"
