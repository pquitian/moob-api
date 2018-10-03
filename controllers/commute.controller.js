const Commute = require('../models/commute.model');
const Vehicles = require('../models/vehicle.model');

module.exports.create = (req, res, next) => {
    const commute = new Commute(req.body);
    commute.driver = req.user.id; 
    console.log('Llegamos aquí --->', commute)

    commute.save()
        .then(com => {
            res.status(201).json(com)
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    Commute.findOneAndDelete({ _id: req.params.commuteId })
        .then(com => {
            if (com) {
                res.status(204).json()
            } else {
                throw createError(404, 'Commute not found');
            }
        })
        .catch(error => next(error))
}
