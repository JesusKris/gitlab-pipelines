# Use debian:latest as the base image
FROM debian:12.1

# Set the working directory inside the container
WORKDIR /app

# Install required packages and nodejs v16.x
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs npm \
    && apt-get --fix-broken install -y \
    && npm install pm2 sequelize-cli npx -g

# Copy only the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies (cache npm install layer)
RUN npm install

# Copy the rest of the application files
COPY . .

# Run npm audit fix (if you still want to run it in the Dockerfile)
RUN npm audit fix --force

RUN chmod +x entrypoint.sh

CMD [ "./entrypoint.sh", "billing" ]