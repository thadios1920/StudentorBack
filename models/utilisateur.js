const mongoose = require('mongoose');

const utilisateurSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    solde: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solde',
        required: false
    },
    profession: {
        type: String,
        required:true
    },
    soldeAux: {
        type: Number,
        // required:true
    },
    servicesoff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceOff',
    }],
    servicesdem: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceDem',
    }]    
})

exports.Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);