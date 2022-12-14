const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

    title: {
        type:String,
        required:[true, "Title is required"],
        minLength:[3, "Title must be at least 3 characters"]
    },
    date: {
        type:Date,
        required:[true, "Date is required"]
    },
    location: {
        type:String, //not sure if correct.....
        required: [true, "Location of event is required"]
    },
    description: {
        type:String,
        required: [true, "Description of event is required"]
    },
    attending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps:true})

const Event= mongoose.model("Event", EventSchema)

module.exports = Event