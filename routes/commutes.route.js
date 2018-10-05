const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const commutesController = require('../controllers/commute.controller');
const user = require('../middlewares/owner.middleware');


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
    //user.isOwner('userId'),
    commutesController.delete);

module.exports = router;
