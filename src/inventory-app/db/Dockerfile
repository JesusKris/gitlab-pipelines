# Use debian:latest as the base image
FROM debian:12.1

# Set the working directory inside the container
WORKDIR /app

RUN apt update && apt upgrade -y && apt install -y postgresql postgresql-contrib

COPY ./entrypoint_db.sh /app/

RUN chmod +x entrypoint_db.sh

CMD ["./entrypoint_db.sh"]