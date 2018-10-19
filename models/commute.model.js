const mongoose = require('mongoose');
const User = require('./user.model');
const Vehicle = require('./vehicle.model');

const commuteSchema = new mongoose.Schema({
    origin: {
        type: {
            type: String, 
            enum: ['Point'],
            default: 'Point',
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
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        } 
    },
    hrOrigin: String,
    hrDestination: String,    
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
        //TODO: validate date (not before right now)
        type: Date,
        required: 'Departure time is required'
    }
}, {
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            ret.departureTime = doc.departureTime.toLocaleString();
            const origin = doc.origin.coordinates;
            const destination = doc.destination.coordinates;
            delete ret.origin;
            delete ret.destination;
            ret.origin = origin; 
            ret.destination = destination;
            delete ret._id;
            delete ret.__v;

            return ret;
        }
    }
})

commuteSchema.index({"origin": "2dsphere"});
commuteSchema.index({"destination": "2dsphere"});

module.exports = mongoose.model('Commute', commuteSchema);
