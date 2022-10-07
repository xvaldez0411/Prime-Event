const Event= require('../models/event.model')
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");

const EventController = {

    create:(req,res)=>{

        const newEventObject = new Event(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete:true
        })

        newEventObject.createdBy = decodedJWT.payload.id
    

        newEventObject.save(req.body)
        .then((event)=>{
            res.status(201).json({event:event})
        })
        .catch((err)=>{
            res.status(400).json({message:"Something went wrong creating event", error:err})
        })
    },

    getAll:(req,res)=>{
        Event.find({})
        .populate("createdBy", "username email")
        .populate("attending", "-password")
        .then((events)=>{
            res.status(200).json({events:events})
        })
        .catch((err)=>{
            res.status(400).json({message:"Something went wrong getting all events", error:err})
        })
    },

    join: (req,res)=>{
        Event.findOneAndUpdate({_id:req.params.id}, {$push:{attending:req.body.user}},{new:true})
        .populate("attending")
        .then((event)=>{
            res.status(200).json({updatedEvent:event})
        })
        .catch((err)=>{
            res.status(400).json({message:"something went wrong updating event", error:err})
        })
    },

    unjoin: (req,res)=>{
        Event.findOneAndUpdate({_id:req.params.id}, {$pull:{attending:req.body.user}},{new:true})
        .populate("attending")
        .then((event)=>{
            res.status(200).json({updatedEvent:event})
        })
        .catch((err)=>{
            res.status(400).json({message:"something went wrong updating event", error:err})
        })
    },

    getOne:(req,res)=>{
        Event.findOne({_id:req.params.id})
        .populate("attending")
        .then((event)=>{
            res.status(200).json({event:event})
        })
        .catch((err)=>{
            res.status(400).json({message:"something went wrong getting event", error:err})
        })
    },

    update:(req,res)=>{
        Event.findOneAndUpdate({_id:req.params.id}, req.body,{new:true,runValidators:true})
        .then((event)=>{
            res.status(200).json({updatedEvent:event})
        })
        .catch((err)=>{
            res.status(400).json({message:"something went wrong updating event", error:err})
        })
    },
    
    delete:(req,res)=>{
        Event.deleteOne({_id:req.params.id})
        .then((event)=>{
            res.status(200).json({deletedEvent:event})
        })
        .catch((err)=>{
            res.status(400).json({message:"something went wrong deleting event", error:err})
        })
    },

    findAllEventsByUser: (req,res)=>{
        if(req.jwtpayload.username !== req.params.username){
            console.log("Not the user")
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Event.find({createdBy: userNotLoggedIn._id})
                    .poplulate("createdBy", "username")
                    .then((allEventsFromUser)=>{
                        console.log(allEventsFromUser)
                        res.json(allEventsFromUser)
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json(err)
                })
        }
        else{
            console.log("Current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id)
            Event.find({ createdBy: req.jwtpayload.id})
            .populate("createdBy", "username")
            .then((allEventsFromLoggedInUser)=>{
                console.log(allEventsFromLoggedInUser)
                res.json(allEventsFromLoggedInUser)
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
        }
    }

}

module.exports = EventController