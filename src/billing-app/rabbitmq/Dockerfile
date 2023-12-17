# Use debian:latest as the base image
FROM debian:12.1

# Set the working directory inside the container
WORKDIR /app

# Install required packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        gnupg \
        apt-transport-https \
        ca-certificates

# Import Team RabbitMQ's main signing key
RUN curl -1sLf "https://keys.openpgp.org/vks/v1/by-fingerprint/0A9AF2115F4687BD29803A206B73A36E6026DFCA" | gpg --dearmor | tee /usr/share/keyrings/com.rabbitmq.team.gpg > /dev/null

# Import Community mirror of Cloudsmith: modern Erlang repository signing key
RUN curl -1sLf https://ppa1.novemberain.com/gpg.E495BB49CC4BBE5B.key | gpg --dearmor | tee /usr/share/keyrings/rabbitmq.E495BB49CC4BBE5B.gpg > /dev/null

# Import Community mirror of Cloudsmith: RabbitMQ repository signing key
RUN curl -1sLf https://ppa1.novemberain.com/gpg.9F4587F226208342.key | gpg --dearmor | tee /usr/share/keyrings/rabbitmq.9F4587F226208342.gpg > /dev/null

# Add apt repositories maintained by Team RabbitMQ
RUN echo "## Provides modern Erlang/OTP releases\n\
deb [signed-by=/usr/share/keyrings/rabbitmq.E495BB49CC4BBE5B.gpg] https://ppa1.novemberain.com/rabbitmq/rabbitmq-erlang/deb/ubuntu buster main\n\
deb-src [signed-by=/usr/share/keyrings/rabbitmq.E495BB49CC4BBE5B.gpg] https://ppa1.novemberain.com/rabbitmq/rabbitmq-erlang/deb/ubuntu buster main\n\
\n\
## Provides RabbitMQ\n\
deb [signed-by=/usr/share/keyrings/rabbitmq.9F4587F226208342.gpg] https://ppa1.novemberain.com/rabbitmq/rabbitmq-server/deb/ubuntu buster main\n\
deb-src [signed-by=/usr/share/keyrings/rabbitmq.9F4587F226208342.gpg] https://ppa1.novemberain.com/rabbitmq/rabbitmq-server/deb/ubuntu buster main" \
    | tee /etc/apt/sources.list.d/rabbitmq.list



# Install Erlang packages
RUN apt-get install -y erlang-base \
    erlang-asn1 \
    erlang-crypto \
    erlang-eldap \
    erlang-ftp \
    erlang-inets \
    erlang-mnesia \
    erlang-os-mon \
    erlang-parsetools \
    erlang-public-key \
    erlang-runtime-tools \
    erlang-snmp \
    erlang-ssl \
    erlang-syntax-tools \
    erlang-tftp \
    erlang-tools \
    erlang-xmerl

RUN apt-get install rabbitmq-server -y --fix-missing

COPY ./entrypoint_rabbitmq.sh /app/

RUN chmod +x entrypoint_rabbitmq.sh

CMD [ "./entrypoint_rabbitmq.sh"]


