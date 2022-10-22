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
    gender: {
        type: String,
        required: true
    },
    solde: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solde',
        required: true
    },
    profession: {
        type: String,
        required:true
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