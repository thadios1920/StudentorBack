const express = require('express');
const router = express.Router()
const { ServiceDem } = require('../models/serviceDem')
const mongoose = require('mongoose')


//Retourne tous les services Demandées
router.get('/servicesDem',async(req,res)=>{
    try {
        const serviceDemList = await ServiceDem.find()
        res.send(serviceDemList)
    } catch (error) {
        console.log(error);
    }
})


//Ajoute un service Demandées
router.post('/addServiceDem',async(req,res)=>{
    let servicedem = new ServiceDem({
        description: req.body.description,
        titre: req.body.titre,
        prix: req.body.prix,
        domaine: req.body.domaine,
        tempsService :req.body.tempsService
        
    })
    servicedem = await servicedem.save()
    if(!servicedem)
    return res.status(400).send('the Service cannot be created!')

    res.send(servicedem);
})


//Exporter le module
module.exports = router