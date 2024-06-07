const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://O2danquah:Layzer2511@cluster0.bjdnlkv.mongodb.net/").then(() => {
        console.log("DB connected successfully")
    }).catch((err) => {
        console.log("database connection failed", err)
    });

}

module.exports = connectDB