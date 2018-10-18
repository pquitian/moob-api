const mongoose = require('mongoose');
const Chat = require('../models/chat.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    const message = new Chat({
        from: req.user.id,
        to: req.params.userId, 
        message: req.body.message
    });
    message.save()
        .then(message => {
            res.status(201).json(message)
        })
        .catch(error => next(error));
    
}

module.exports.listInbox = (req, res, next) => {
    if (req.user.id === req.params.authId) {
        Chat.find({ $or: [{ "from": req.params.authId }, {"to": req.params.authId}] })
            .then(messages => {
                if(messages) {
                    res.json(messages);
                } else {
                    throw createError(404, 'There is any message');
                }
            })
            .catch(error => next(error));
    } else {
        throw createError(403, "You don't have permissions");
    }
    
}

module.exports.getMessages = (req, res, next) => {
    Chat.find({ $or: [{"from": req.user.id, "to": req.params.userId }, {"from": req.params.userId, "to": req.user.id}] })
        .sort({"createdAt": 1})
        .then(messages => {
            console.log('MESSAGES', messages);
            if (messages) {
                res.json(messages)
            }
            else {
                throw createError(404, 'There is any message')
            }
        })
        .catch(error => next(error))
}
