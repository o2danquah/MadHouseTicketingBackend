const express = require("express");
const db = require("./config/db");
const dotenv = require("dotenv");
const Payment = require("./models/payment")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

dotenv.config({path: "./config/config.env"});



 app.use(express.json());
//  app.use("/", (req, res) => {
//     
//     res.send("Server is running");
//  })

db();
 app.post("/Ticket", async (req, res) => {
    try {
        console.log(req.body);
        const payment = await Payment.create(req.body)
        res.status(200).json(payment)
        
    } catch (error) {
        console.log("Error Message")
        res.status(200).json("Problem with database")
    }

   
   

 })
 





app.listen(3000, () => {
    console.log(`server is working on Port 5000 `)
})