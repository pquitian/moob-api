const mongoose = require('mongoose');
const User = require('./user.model');
const Vehicle = require('./vehicle.model');

const commuteSchema = new mongoose.Schema({
    origin: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    destination: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        } 
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle'

    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: 'At least one driver is required'
    }, 
    passengers: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'User', 
        default: []
    }, 
    departureTime: {
        type: Date, 
        required: 'Departure time is required'
    }, 
    arrivalTime: {
        type: Date, 
        required: 'Arrival time is required'
    }
    //TODO: Add comments to model
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
})

module.exports = mongoose.model('Commute', commuteSchema);
