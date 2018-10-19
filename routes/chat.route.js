const express = require('express');
const router = express.Router({ mergeParams: true  });
const chatController = require('../controllers/chat.controller');

router.get('/', chatController.listInbox);
router.post('/:userId/create', chatController.create);
router.get('/:userId', chatController.getMessages);

module.exports = router;
