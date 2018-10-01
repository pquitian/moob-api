const mongoose = require('mongoose');
const User = require('./user.model');
const Vehicle = require('./vehicle.model');

const commuteSchema = new mongoose.Schema({
    origin: {
        type: {
            type: String
        },
        coordinates: [Number], 
        required: 'Origin is required'
    },
    destination: {
        type: {
            type: String
        }, 
        coordinates: [Number], 
        required: 'Destination is required'
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
})

module.exports = mongoose.model('Commute', commuteSchema);
