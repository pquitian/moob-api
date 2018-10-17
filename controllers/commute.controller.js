const Commute = require('../models/commute.model');
const Vehicles = require('../models/vehicle.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    const {
        origin,
        destination,
        vehicle,
        driver,
        passengers,
        departureTime
    } = req.body;

    const commute = new Commute(req.body);
    commute.origin.coordinates = origin;
    commute.destination.coordinates = destination;
    commute.driver = req.user.id;

    commute.save()
        .then(com => {
            res.status(201).json(com)
        })
        .catch(error => next(error))
}

module.exports.getOne = (req, res, next) => {
    Commute.findById(req.params.commuteId)
        .populate({path: 'driver', model: 'User' })
        .populate({path: 'passengers', model: 'User' })
        .populate({path: 'vehicle', model: 'Vehicle' })
        .then(commute => { 
            if (!commute) {
                throw createError(404, 'Commute not found');
            } else {
                res.json(commute);
            }
        })
        .catch(error => next(error));
}

module.exports.listAll = (req, res, next) => {
    Commute.find()
        .populate({path: 'driver', model: 'User' })
        .populate({path: 'passengers', model: 'User' })
        .populate({path: 'vehicle', model: 'Vehicle' })
        .then(commute => { 
            if (!commute) {
                throw createError(404, 'There is any commit :(');
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

module.exports.addPassenger = (req, res, next) => {
    Commute.findByIdAndUpdate({_id: req.params.commuteId}, {$push: { passengers: req.user.id }}, { new: true })
        .then((commute) => {
            if (!commute) {
                throw createError(404, 'Commute not found');
            } else {
                res.status(201).json(commute);
            }
        })
        .catch(error => next(error));
}


module.exports.filter = (req, res, next) => {
    const dateBegin = req.query.date_from;
    const dateEnd = req.query.date_to;
    let criteria = {}
    if (req.query.dest_lat && req.query.origin_lat) {
        criteria = {
            origin: {
                $geoWithin: 
                        { 
                            $centerSphere:  [ [req.query.origin_lat, req.query.origin_lng], 10/3963.2  ]
                        }
            },
            destination: {
                $geoWithin: 
                        { 
                            $centerSphere:  [ [req.query.dest_lat, req.query.dest_lng], 10/3963.2  ]
                        }
            }, 
            departureTime: { 
                $gte:new Date(dateBegin), 
                $lt: new Date(dateEnd) 
            }
        } 
    }

    console.log(criteria);

    Commute.find(criteria)
        .then((commutes) => {
            res.json(commutes);
        })
        .catch(error => next(error))
}
