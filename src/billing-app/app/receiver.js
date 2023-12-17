const amqplib = require("amqplib");
const { createBill } = require("./data/queries");

let connection;
let channel;
const queue = process.env.RABBITMQ_QUEUE

async function connectQueue() {

    process.once("SIGINT", closeConnection)
    process.once("SIGTERM", closeConnection)

    try {

        connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_IP}:${process.env.RABBITMQ_PORT}`);

        channel = await connection.createChannel()

        await channel.assertQueue(queue);

        subscribeToQ()

    } catch (err) {
        console.error(err)
        return
    }

    console.log("[*] Successfully connected to a RabbitMQ queue. Receiver online!");

}

async function subscribeToQ() {

    await channel.consume(queue, (message) => {

        if (message) {

            const parsed = JSON.parse(message.content)

            try {
                createBill(parsed.user_id, parsed.number_of_items, parsed.total_amount)
            }
            catch (err) {
                console.err(err)
            }
        }
    },
        { noAck: true }
    );
}

async function closeConnection() {

    try {

        await connection.close();
        await channel.close();

    }
    catch (err) {
        console.error(err)
    }
}

module.exports = { subscribeToQ, connectQueue }