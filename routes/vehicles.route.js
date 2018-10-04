const express = require('express');
const router = express.Router({ mergeParams: true  });
const vehiclesController = require('../controllers/vehicles.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', 
    authMiddleware.isAuthenticated, 
    vehiclesController.create);

router.get('/:vehicleId', 
    authMiddleware.isAuthenticated,
    vehiclesController.get);

router.patch('/:vehicleId', 
    authMiddleware.isAuthenticated,
    vehiclesController.update);

router.delete('/:vehicleId', 
    authMiddleware.isAuthenticated, 
    vehiclesController.delete);

module.exports = router;
