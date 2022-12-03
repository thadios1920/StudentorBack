const express = require('express');
const router = express.Router()
const { ServiceDem } = require('../models/serviceDem')
const mongoose = require('mongoose')


//Retourne tous les services Demandées
router.get('/',async(req,res)=>{
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

router.put('/:id', async (req, res) => {

   

    service = await ServiceDem.findByIdAndUpdate(
        req.params.id,
        {
        description: req.body.description,
        titre: req.body.titre,
        prix: req.body.prix,
        domaine: req.body.domaine,
        tempsService :req.body.tempsService
        }, { new: true }// Pour retourner les nouvelles données non pas les anciennes
    )
    if (!service) {
        return res.send('service not found')
    }
    res.send(service)
})

//Delete Request Supprimer un Service Demandée
router.delete('/:id', (req, res) => {
    ServiceDem.findByIdAndRemove(req.params.id)
        .then(user => {
            if (user) { return res.send(200).json({ success: true, message: 'Service Demandée DELETED' }) }
        })
        .catch(err => { console.log(err); })
})


//Exporter le module
module.exports = router