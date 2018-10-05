const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const commutesController = require('../controllers/commute.controller');

router.post('/',
    authMiddleware.isAuthenticated, 
    commutesController.create);

router.get('/',
    authMiddleware.isAuthenticated, 
    commutesController.listAll);

router.get('/:commuteId',
    authMiddleware.isAuthenticated, 
    commutesController.getOne);

router.delete('/:commuteId',
    authMiddleware.isAuthenticated,
    commutesController.delete);

module.exports = router;
