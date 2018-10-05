const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    rate: {
        type: Number, 
        min: 1, 
        max: 5,
        required: 'Please, choose your rate'
    },
    review: {
        type: String
    }, 
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }, 
    receiver: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
}, {
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Score', scoreSchema);
