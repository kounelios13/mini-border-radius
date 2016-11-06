#!/usr/bin/bash
echo "Write a commit message and press enter"
read "msg"
git add "*.*"
git commit -m"$msg"
git push
echo "Press any key to exit"
read k
