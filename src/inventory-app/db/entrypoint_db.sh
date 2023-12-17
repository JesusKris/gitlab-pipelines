#!/bin/bash

service postgresql start

# Create a PostgreSQL user and database using the postgres user
su - postgres -c "psql -c \"CREATE USER $POSTGRES_USERNAME WITH PASSWORD '$POSTGRES_PASSWORD';\""
su - postgres -c "psql -c \"CREATE DATABASE $POSTGRES_DATABASE OWNER '$POSTGRES_USERNAME';\""

# Specify the path to the PostgreSQL config file
config_file="/etc/postgresql/15/main/postgresql.conf"
pg_hba_conf="/etc/postgresql/15/main/pg_hba.conf"

# Use sed to replace the line starting with 'listen_addresses' in the config file
sed -i "s/^#listen_addresses = .*/listen_addresses = '*'/" "$config_file"

echo "host    all             all             0.0.0.0/0               md5" >> "$pg_hba_conf"

# Restart PostgreSQL to apply changes
service postgresql restart

shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null