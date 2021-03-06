const mongoose = require('mongoose');
const createError = require('http-errors');
const Vehicle = require('../models/vehicle.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    const vehicle = new Vehicle(req.body);
    vehicle.save()
        .then(vehicle => {
            User.findOneAndUpdate({ _id: req.user.id }, {$push: { vehicles: vehicle._id }}, { new: true })
            .populate({path: 'vehicles', model: 'Vehicle' })
            .then(user => {
                    if (!user) {
                        throw createError(404, 'User not found');
                    } else {
                        res.status(201).json(user);
                    }
                })
                
        })
        .catch(error => next(error));
};

module.exports.get = (req, res, next) => {
    Vehicle.findById(req.params.vehicleId)
        //.populate() ownerF
        .then(vehicle => { 
            res.json(vehicle);
        })
        .catch(error => next(error));
}

module.exports.update = (req, res, next) => {  
    Vehicle.findByIdAndUpdate(req.params.vehicleId, req.body)
        .then(vehicle => {
            if (req.files) {
                vehicle.image = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            }
            res.status(200).json(vehicle)
        })
        .catch(error => next(error));
}

        //My kitten Frikandel wrote this lines. She wants to be a programmer and I'm not going to stop her
        //hyyy.,,,,,,,,,,,,t6 n0
//lñññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnh

module.exports.delete = (req, res, next) => {
    Vehicle.findOneAndDelete({ _id: req.params.vehicleId})
        .then(vehicle => {
            if(vehicle) {
                res.status(204).json();
            } else {
                throw createError(404, 'Vehicle not found');
            }
        })
        .catch((error) => {
            next(error);
        })
    // Promise.all([
    //     Vehicle.findOneAndDelete({ _id: req.params.vehicleId}),
    //     User.findOneAndUpdate({ _id: req.user.id }, { $unset: { vehicles: { $in: [req.params.vehicleId] } } }, { new: true } )
    // ])
    // .then(vehicle => {
    //             if(vehicle) {
    //                 console.log('Borrado vehículo')
    //                 res.status(204).json();
    //             } else {
    //                 throw createError(404, 'Vehicle not found');
    //             }
    //         })
    //         .catch((error) => {
    //             next(error);
    //         })

};

