const Score = require('../models/score.model');

module.exports.create = (req, res, next) => {
    const score = new Score(req.body);
    score.author = req.user.id;
    score.receiver = req.params.receiverId;

    score.save()
        .then(score => res.status(201).json(score))
        .catch(error => next(error));
}
