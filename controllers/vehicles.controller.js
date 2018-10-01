const mongoose = require('mongoose');
const Vehicle = require('../models/vehicle.model');

module.exports.create = (req, res, next) => {
    Vehicle.findOne({ licensePlate: req.body.licensePlate })
        .then(vehicle => {
            if (!vehicle) {
                vehicle = new Vehicle(req.body);
                return vehicle.save()
                    .then(vehicle => {
                        //TODO: add vehicle.id to this user(req.user)
                        
                        res.status(201).json(vehicle)
                    })
            } else {
                throw createError(409, `Vehicle with ${req.body.licensePlate} is already registered`);
            }
        })
        .catch(error => next(error))

};

module.exports.delete = (req, res, next) => {

};
