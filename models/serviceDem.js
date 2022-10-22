const mongoose = require('mongoose');

const serviceDemSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    domaine: {
        type: String,
        required: true
    },
    tempsService: {
        type: String,
        required: true
    }
    
})

exports.ServiceDem = mongoose.model('ServiceDem', serviceDemSchema);