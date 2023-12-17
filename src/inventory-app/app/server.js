const express = require("express")
const setupRoutes = require("./routes.js") 


const app = express()
app.use(express.json());

setupRoutes(app)



app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Inventory-app listening at http://localhost:${process.env.EXPRESS_PORT}`)
})