const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

//TODO: Add auth middleware
router.post('/', usersController.create);
router.delete('/:id', usersController.delete); //TODO: Add owner's middleware

module.exports = router;
