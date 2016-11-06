#!/usr/bin/bash
echo "Write a commit message and press enter"
read "msg"
git add "*.*"
git commit -m"$msg"
git push
echo "Press enter to exit"
read k
