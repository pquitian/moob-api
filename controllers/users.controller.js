const User = require('../models/user.model');
const mongoose = require('mongoose');
const createError = require('http-errors')

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
    User.findOneAndDelete({ _id: req.body.id  })
        .then()
        .catch()
}

