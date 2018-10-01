const mongoose = require('mongoose');
const createError = require('http-errors')
const User = require('../models/user.model');
const Vehicle = require('../models/vehicle.model');
const Commute = require('../models/commute.model');

module.exports.create = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user)=> {
            if(!user) {
                user = new User(req.body);
                return user.save()
                    .then(user => {
                        res.status(201).json(user);
                    })
            } else {
                throw createError(409, `User with email ${req.body.email} already exists`);
            }
        })
        .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
    //TODO: delete user's vehicles and related comments
    User.findOneAndDelete({ _id: req.params.id  })
        .then((user) => {
            if(user) {
                res.status(204).json();
            } else {
                throw createError(404, 'User not found');
            }
        })
        .catch((error) => {
            next(error);
        })
}

