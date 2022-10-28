const mongoose = require('mongoose');

const serviceOffSchema = mongoose.Schema({
    description: {
        type: String,
        // required: true
    },
    titre: {
        type: String,
        // required: true
    },
    prix: {
        type: Number,
        // required: true
    },
    domaine: {
        type: String,
        // required: true
    },
    commentaires: [{
        type:String,
    }],
    tempsService: {
        type: String,
        // required: true
    }
    
})

exports.ServiceOff = mongoose.model('ServiceOff', serviceOffSchema);