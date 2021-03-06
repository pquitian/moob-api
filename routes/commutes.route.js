const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const commutesController = require('../controllers/commute.controller');

router.post('/',
    authMiddleware.isAuthenticated, 
    commutesController.create);

router.get('/',
    commutesController.listAll);

router.get('/filter',
    authMiddleware.isAuthenticated, 
    commutesController.filter);

router.get('/getall',
    authMiddleware.isAuthenticated,
    commutesController.listDriverCommutes);

router.get('/listpassenger',
    authMiddleware.isAuthenticated,
    commutesController.listUserAsPassenger);

router.get('/:commuteId',
    authMiddleware.isAuthenticated, 
    commutesController.getOne);

router.post('/:commuteId',
    authMiddleware.isAuthenticated,
    commutesController.addPassenger);

router.delete('/:commuteId',
    authMiddleware.isAuthenticated,
    commutesController.delete);

module.exports = router;
