const mongoose = require('mongoose');
const Vehicle = require('../models/vehicle.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    Vehicle.findOne({ licensePlate: req.body.licensePlate })
        .then(vehicle => {
            if (!vehicle) {
                vehicle = new Vehicle(req.body);
                return vehicle.save()
                    .then(vehicle => {
                        res.status(201).json(vehicle)
                        return User.findByIdAndUpdate({ _id: req.user.id })
                            .then(user => {
                                if (user) {
                                    user.vehicles.push(vehicle.id) //ASK QUESTION: is this id or _id?
                                } else {
                                    throw createError(404, 'User not found');
                                }
                            })
                    })
            } else {
                throw createError(409, `Vehicle with ${req.body.licensePlate} is already registered`);
            }
        })
        .catch(error => next(error))

};

module.exports.delete = (req, res, next) => {

};
