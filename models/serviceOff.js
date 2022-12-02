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

serviceOffSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

serviceOffSchema.set('toJSON', {
    virtuals: true,
});

exports.serviceOffSchema = serviceOffSchema;
exports.ServiceOff = mongoose.model('ServiceOff', serviceOffSchema);