const express = require("express")
const setupRoutes = require("./routes.js"); 
const { connectQueue } = require("./receiver.js");


const app = express()
app.use(express.json());

setupRoutes(app)
connectQueue()


app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Billing-app listening at http://localhost:${process.env.EXPRESS_PORT}`)
})