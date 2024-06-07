const express = require("express");
const db = require("./config/db");
const dotenv = require("dotenv");
const payment =  require('./routes/payment.route');
const Payment = require("./models/payment")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

dotenv.config({path: "./config/config.env"});


db();
 app.use(express.json());
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
 


app.use("/", payment)

const port = process.env.PORT;


app.listen(port, () => {
    console.log(`server is working on Port: ${port}`)
})