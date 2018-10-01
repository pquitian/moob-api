const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles.controller');

router.post('/', vehiclesController.create);
router.delete('/', vehiclesController.delete);

module.exports = router;
