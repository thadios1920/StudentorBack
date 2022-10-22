const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const {ServiceDem} = require('../Backend/models/serviceDem')
const {ServiceOff} = require('../Backend/models/serviceOff')
const {Utilisateur} = require('../Backend/models/utilisateur')
const {Solde} = require('../Backend/models/solde')

//Definition du fichier envirennement
require('dotenv/config')

//Middlware qui intervient sur la requette pour mentionner qu'elle est de type json
app.use(express.json())
//Display logs (requests...) in specifics format
app.use(morgan('tiny'))
//Autoriser a Angular d'acceder au NodeJS
app.use(cors())
app.options('*', cors)

//Retourne tous les services offertes
app.get('/servicesOff',async(req,res)=>{
    try {
        const serviceOffList = await ServiceOff.find()
        res.send(serviceOffList)
    } catch (error) {
        console.log(error);
    }
})

//Retourne tous les services Demandées
app.get('/servicesDem',async(req,res)=>{
    try {
        const serviceDemList = await ServiceDem.find()
        res.send(serviceDemList)
    } catch (error) {
        console.log(error);
    }
})

app.get('/utilisateurs',async(req,res)=>{
    try {
        const userList = await Utilisateur.find()
        .populate('servicesdem')
        .populate('servicesoff')
        .populate('solde')
        res.send(userList)
    } catch (error) {
        console.log(error);
    }
})

//Connexion sur la base de données 
mongoose.connect(process.env.CONNECT_STRING)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    })

// Connexion au serveur sur le port 8080
app.listen(5353, () => {
    console.log("Server Started : http://localhost:5353");
})