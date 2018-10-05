const Commute = require('../models/commute.model');
const Vehicles = require('../models/vehicle.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    const commute = new Commute(req.body);
    commute.driver = req.user.id; 

    commute.save()
        .then(com => {
            res.status(201).json(com)
        })
        .catch(error => next(error))
}

module.exports.listAll = (req, res, next) => {
    Commute.find()
    //TODO populate() vehicle, drivers, passengers
        .then(commute => { 
            res.json(commute)
        })
        .catch(error => next(error))
}

module.exports.getOne = (req, res, next) => {
    Commute.findById(req.params.commuteId)
        .then(commute => { 
            if (!commute) {
                throw createError(404, 'Commute not found');
            } else {
                res.json(commute);
            }
        })
        .catch(error => next(error));
}


module.exports.delete = (req, res, next) => {
    Commute.findOneAndDelete({ $and: [{ _id: req.params.commuteId }, { driver: req.user.id }]})
        .then(com => {
            if (com) {
                res.status(204).json()
            } else {
                throw createError(404, 'Commute not found');
            }
        })
        .catch(error => next(error))
}
