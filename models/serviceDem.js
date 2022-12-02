const mongoose = require('mongoose');

const serviceDemSchema = mongoose.Schema({
 
    description: {
        type: String,
      //  required: true
    },
    titre: {
        type: String,
       // required: true
    },
    prix: {
        type: Number,
      //  required: true
    },
    domaine: {
        type: String,
      //  required: true
    },
    tempsService: {
        type: String,
       // required: true
    }
    
})

serviceDemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

serviceDemSchema.set('toJSON', {
    virtuals: true,
});

exports.serviceDemSchema = serviceDemSchema;

exports.ServiceDem = mongoose.model('ServiceDem', serviceDemSchema);