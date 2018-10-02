const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', sessionsController.create);
router.delete('/', 
    authMiddleware.isAuthenticated,
    sessionsController.delete);

module.exports = router;
