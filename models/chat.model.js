const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    message: {
        type: String, 
        required: true
    }

}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})

module.exports = mongoose.model('Chat', chatSchema);