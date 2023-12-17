#!/bin/bash

# Start node server using PM2
pm2 start server.js --name "$1"

# Saving the process
pm2 save

pm2 logs
