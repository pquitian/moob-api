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
        type: String,
        required: 'Number of seats is required'
    }, 
    year: String,
    image: {
        type: String, 
        default: ' '
        //TODO: add default image
    }, 
    licensePlate: {
        unique: true, 
        required: 'License Plate is required just for security purposes'
    }, 
    drivers: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'User',
        required: 'At least one driver is required'
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
