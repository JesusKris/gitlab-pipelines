#!/bin/bash

cd data

# Apply migrations using the CLI
npx sequelize-cli db:migrate --config config/config.js

cd ..

# Start node server using PM2
pm2 start server.js --name "$1"

# Saving the process
pm2 save

pm2 logs
