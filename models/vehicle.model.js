const mongoose = require('mongoose');
const User = require('./user.model');

const vehicleSchema = new mongoose.Schema({
    brand: {
        type: String, 
        required: 'Brand is required'
    }, 
    model: {
        type: String, 
        required: 'Model is required'
    },
    seats: {
        type: Number
    }, 
    year: String,
    image: {
        type: String, 
        default: ''
        //TODO: add default image
    },
    fuel: {
        type: String,
        enum: ['gasoline', 'diesel', 'hybrid', 'electric', 'LPG']
    }
}, {
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret.licensePlate;
            delete ret._id;
            delete ret.__v;

            return ret;
        }
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
