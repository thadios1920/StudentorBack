const express = require('express');

const router = express.Router()
const { ServiceOff } = require('../models/serviceOff')
const mongoose = require('mongoose')
//Upload Files
const multer = require('multer') 

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

//Retourne tous les services offertes
router.get('/',async(req,res)=>{
    try {
        const serviceOffList = await ServiceOff.find()
        res.send(serviceOffList)
    } catch (error) {
        console.log(error);
    }
})

//Ajoute un service offert
router.post('/',async(req,res)=>{
    let serviceoff = new ServiceOff({
        description: req.body.description,
        titre: req.body.titre,
        prix: req.body.prix,
        domaine: req.body.domaine,
        tempsService :req.body.tempsService
        
    })
    serviceoff = await serviceoff.save();
    if(!serviceoff)
    return res.status(400).send('the Service cannot be created!')

    res.send(serviceoff);
})


router.put('/:id',async(req,res)=>{
    let ServiceOff = new ServiceOff({
        description: req.body.description,
        titre: req.body.titre,
        prix: req.body.prix,
        domaine: req.body.domaine,
        tempsService :req.body.tempsService
        
    })
    ServiceOff = await ServiceOff.save()
    if(!ServiceOff)
    return res.status(400).send('the Service cannot be created!')

    res.send(ServiceOff);
})

//Delete Request Supprimer un Service Offert
router.delete('/:id', (req, res) => {
    ServiceOff.findByIdAndRemove(req.params.id)
        .then(user => {
            if (user) { return res.send(200).json({ success: true, message: 'Service Offert DELETED' }) }
        })
        .catch(err => { console.log(err); })
})

//Exporter le module
module.exports = router