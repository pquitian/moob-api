const express = require('express');
const router = express.Router({ mergeParams: true  });
const chatController = require('../controllers/chat.controller');



router.get('/', chatController.listInbox);
router.get('/:userId', chatController.getMessages);
router.post('/:userId', chatController.create);

module.exports = router;
