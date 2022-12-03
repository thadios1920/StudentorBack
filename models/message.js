const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {
        type: String,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Utilisateur',
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Utilisateur',
    }
 
},
{
    timestamps:true,
}
);


messageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

messageSchema.set('toJSON', {
    virtuals: true,
});

exports.Message = mongoose.model('Message', messageSchema);