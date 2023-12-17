import { connect } from "amqplib";
import { ErrorRes, ResponseTypes, SuccessRes } from "./responses.js";


let connection;
let channel;
const queue = process.env.RABBITMQ_QUEUE


export async function connectQueue() {

    process.once("SIGINT", closeConnection)
    process.once("SIGTERM", closeConnection)

    try {
        
        connection = await connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_IP}:${process.env.RABBITMQ_PORT}`);

        channel = await connection.createChannel()

        await channel.assertQueue(queue);

    } catch (err) {
        console.error(err)
        return
    }

    console.log("[*] Successfully connected to a RabbitMQ queue. Publisher online!");

}

export async function sendToQ(req, res) {

    let errResp = new ErrorRes(req, res, ResponseTypes.UnavailableApi502, "This api might be experiencing issues or is under maintenance. Please try again later.")

    if (req.body.user_id && req.body.number_of_items && req.body.total_amount) {

        try {
            
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)))

            const resp = new SuccessRes(req, res, ResponseTypes.Success200, "Successfully inserted a bill.")

            return resp.send()

        }
        catch {
            return errResp.send()
        }

    }

    errResp = new ErrorRes(req, res, ResponseTypes.BadRequest400, req.body)

    errResp.send()
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