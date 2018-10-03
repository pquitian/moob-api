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

module.exports.get = (req, res, next) => {
    User.findById(req.params.userId)
        //.populate('vehicle')
        .then(user => { 
            res.json(user);
        })
        .catch(error => next(error));
}

module.exports.update = (req, res, next) => {  
    User.findByIdAndUpdate(req.params.userId, req.body)
      .then(user => {
          res.status(200).json(user)
        })
      .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
    Promise.all([
        User.findOneAndDelete({ _id: req.params.userId  }),
        Vehicle.deleteMany({ owner: mongoose.Types.ObjectId(req.params.userId)  }),
        Commute.deleteMany({ driver: mongoose.Types.ObjectId(req.params.userId)  })])
            .then(([user]) => {
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
