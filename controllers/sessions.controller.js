const mongoose = require('mongoose');
const passport = require('passport');

// Log in
module.exports.create = (req, res, next) => {
    passport.authenticate('auth-local', (error, user) => {
        if (error) {
            next(error);
        } else {
            req.login(user, (error) => {
                if (error) {
                    next(error)
                } else {
                    res.status(201).json(user);
                }
            });
        }
    })(req, res, next);
}

//Log out 
module.exports.delete = (req, res, next) => {
    req.logout();
    res.status(204).json();
}
