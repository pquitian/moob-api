const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../configs/multer.config');

router.post('/', usersController.create);

router.get('/:userId', 
    authMiddleware.isAuthenticated,
    usersController.get);

router.patch('/:userId', 
    authMiddleware.isAuthenticated,
    upload.single('avatar'),
    usersController.update);

router.delete('/:userId', 
    authMiddleware.isAuthenticated, 
    usersController.delete); //TODO: Add owner's middleware

module.exports = router;
