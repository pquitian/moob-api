const mongoose = require('mongoose');
const Chat = require('../models/chat.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    console.log('HOLA, CREAS UNO???')
    const message = new Chat(req.body);
    message.save()
        .then(message => {
            console.log('MMMMM', message)
            res.status(201).json(message)
        })
        .catch(error => next(error));
    
}

module.exports.listInbox = (req, res, next) => {
    if (req.user.id === req.params.authId) {
        Chat.find({ $or: [{ "from": req.params.authId }, {"to": req.params.authId}] })
            .populate({path: 'from', model: 'User' })
            .populate({path: 'to', model: 'User' })
            .then(messages => {
                if(messages) {
                    let senders = messages.map((msg) => msg.from);
                    let allSenders = senders.filter((item, pos) => senders.indexOf(item) === pos );

                    res.json(allSenders);
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
        .populate({path: 'from', model: 'User' })
        .populate({path: 'to', model: 'User' })
        .then(messages => {
            console.log('MESSAGES', messages.length);
            if (messages) {
                res.json(messages)
            }
            else {
                throw createError(404, 'There is any message')
            }
        })
        .catch(error => next(error))
}
