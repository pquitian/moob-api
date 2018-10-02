const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', usersController.create);

router.delete('/:userId', 
    authMiddleware.isAuthenticated, 
    usersController.delete); //TODO: Add owner's middleware

module.exports = router;
