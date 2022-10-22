const mongoose = require('mongoose');

const soldeSchema = mongoose.Schema({
    derniereDateRecharge: {
        type: String,
        required: true
    },
    montantRecharge: {
        type: Number,
        required: true
    },
    derniereDatePrelevement: {
        type: String,
        required: true
    },
    montantPrelevement: {
        type: Number,
        required: true
    },
    nbTokens: {
        type: Number,
        required:true
    }
    
})

exports.Solde = mongoose.model('Solde', soldeSchema);