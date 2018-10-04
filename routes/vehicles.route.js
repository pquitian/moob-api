const express = require('express');
const router = express.Router({ mergeParams: true  });
const vehiclesController = require('../controllers/vehicles.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../configs/multer.config');

router.post('/', 
    authMiddleware.isAuthenticated,
    upload.single('image'), 
    vehiclesController.create);

router.get('/:vehicleId', 
    authMiddleware.isAuthenticated,
    vehiclesController.get);

router.patch('/:vehicleId', 
    authMiddleware.isAuthenticated,
    upload.single('image'),
    vehiclesController.update);

router.delete('/:vehicleId', 
    authMiddleware.isAuthenticated, 
    vehiclesController.delete);

module.exports = router;
