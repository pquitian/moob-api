const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    }, 
    email: {
        type: String,
        required: 'Email is required'
    }, 
    password: {
        type: String, 
        required: 'Password is required'
    }, 
    avatar: {
        type: String, 
        default: ' '
    }
}, { 
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password; 
            return ret;
        }
    }
});

module.exports = mongoose.model('User', userSchema);
