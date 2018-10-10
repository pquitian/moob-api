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
        departureTime,
        arrivalTime
    } = req.body;

    const commute = new Commute(req.body);
    commute.driver = req.user.id;

    commute.save()
        .then(com => {
            res.status(201).json(com)
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

module.exports.listAll = (req, res, next) => {
    Commute.find()
        .populate({path: 'driver', model: 'User' })
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


module.exports.filter = (req, res, next) => {
    const dateBegin = req.query.date_from.toString();
    const dateEnd = req.query.date_to.toString();

    console.log(dateBegin)
    //TODO: conditionals if req.query is empty

    Promise.all([
        Commute.find({
            origin: {
                $near: 
                        { 
                            $geometry: { type: 'Point', coordinates: [req.query.from_lat, req.query.from_long] },
                            $minDistance: 0, 
                            $maxDistance: req.query.distance_from 
                        }
            }, 
            departureTime: { 
                $gte: new Date(dateBegin), 
                $lt: new Date(dateEnd)  
            }
        
        }),
        Commute.find({
            destination: {
                $near: 
                    { 
                        $geometry: { type: 'Point', coordinates: [req.query.to_lat, req.query.to_long] },
                        $minDistance: 0,
                        $maxDistance: req.query.distance_to 
                    }
            }, 
            departureTime: { 
                $gte:new Date(dateBegin), 
                $lt: new Date(dateEnd) 
            }
        })
    ]).then((values) => {
        const uniques = values.filter((el, index, arr) => arr.map(x => x.id).indexOf(el.id) === index)
        res.json(uniques);
    })
    .catch(error => next(error))
}
