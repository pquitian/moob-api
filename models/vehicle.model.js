const mongoose = require('mongoose');

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
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
