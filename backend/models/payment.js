const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    reference: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    
    phonenumber: {
        type: String,

    },
    


}, 

{
    timestamps: true
})

module.exports = mongoose.model("PaymentModel", paymentSchema);
