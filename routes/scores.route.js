const express = require('express');
const router = express.Router();
const scoresController = require('../controllers/scores.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/:receiverId', 
    authMiddleware.isAuthenticated,
    scoresController.create  
);

module.exports = router;
