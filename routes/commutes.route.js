const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const commutesController = require('../controllers/commute.controller');

router.post('/',
    authMiddleware.isAuthenticated, 
    commutesController.create);

router.get('/',
    authMiddleware.isAuthenticated, 
    commutesController.list);

router.get('/:commuteId',
    authMiddleware.isAuthenticated, 
    commutesController.get);

router.delete('/:commuteId',
    authMiddleware.isAuthenticated, 
    commutesController.delete);

module.exports = router;
