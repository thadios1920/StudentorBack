const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const authJWT = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

//Definition du fichier envirennement
require('dotenv/config')

const API = process.env.API_URL


//Import Routers
const servicesDemRouter = require("./routers/servicesDem")
const servicesOffRouter = require("./routers/servicesOff")
const soldesRouter = require("./routers/soldes")
const  utilisateursRouter = require("./routers/utilisateurs")

//Middlware qui intervient sur la requette pour mentionner qu'elle est de type json
app.use(express.json())
//Display logs (requests...) in specifics format
app.use(morgan('tiny'))
//Autoriser a Angular d'acceder au NodeJS
app.use(cors())
app.options('*', cors)
//Fonction de Verification de JWT
app.use(authJWT())
//Gestion des errors detectés
app.use(errorHandler)
//Declarer folder comme static folder
app.use("/public/uploads", express.static(__dirname + "/public/uploads"))




//Routers
app.use(`${API}/serviceDem`, servicesDemRouter)
app.use(`${API}/derviceOff`, servicesOffRouter )
app.use(`${API}/solde`, soldesRouter)
app.use(`${API}/utilisateur`, utilisateursRouter)




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