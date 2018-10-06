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


module.exports.filter = (req, res, next) => {
    const sphereRadius = 6378.1 * 1000;
    const radians = req.query.distance / sphereRadius;

    console.log('departure-time: ', req.query.date  );

    Promise.all([
        Commute.find({
            origin: {
                $near: 
                        { 
                            $geometry: { type: 'Point', coordinates: [req.query.fromLat, req.query.fromLong] },
                            $minDistance: 0, 
                            $maxDistance: 1000 
                        }
            }, 
            departureTime: { 
                $gte:new Date("2018-10-05 21:40:04Z"), 
                $lt: new Date("2018-10-05 21:48:04Z") 
            }
        
        }),
        Commute.find({
            destination: {
                $near: 
                    { 
                        $geometry: { type: 'Point', coordinates: [req.query.toLat, req.query.toLong] },
                        $minDistance: 0,
                        $maxDistance: 1000 
                    }
            }, 
            departureTime: { 
                $gte:new Date("2018-10-05 21:40:04Z"), 
                $lt: new Date("2018-10-05 21:48:04Z") 
            }
        })
    ]).then((values) => {
        const uniques = values.filter((el, index, arr) => arr.map(x => x.id).indexOf(el.id) === index)
        res.json(uniques);
    })
    .catch(error => next(error))
}
