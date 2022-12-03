const express = require('express');
const router = express.Router();
const{Message}=require('../models/message');
const mongoose = require('mongoose');


//add msg from/to
router.post('/ajout/:from/:to/:msg',async (req,res)=>{
    try{
        let msgNew= new Message ({
            message:req.params.msg,
            sender: req.params.from,
            receiver:req.params.to,
        });
        await msgNew.save();
        res.send(msgNew);
    }catch(err){
        console.log(err);
    }
})

//getAll msg  between 2Users
router.get('/all/:from/:to',async(req,res)=>{
    
    try{
        const listMsg= await Message.find(
           
            {$and: [{$or: [{sender: req.params.from}, {sender: req.params.to}]},
                    {$or: [{receiver: req.params.to}, {receiver: req.params.from}]}]}
        )
        .populate('sender')
        .sort({updatedAt:1})
        res.send(listMsg);
        }
        catch(err){
            console.log(err)
        }
})

router.get('/receiver/:from',async(req,res)=>{
    try{
        const listContact= await Message.find({sender: req.params.from})
        .populate('sender')
        .populate('receiver')
        .sort({updatedAt:1})
        res.send(listContact)
       
    }catch(err){
        console.log(err)
    }
})

module.exports = router