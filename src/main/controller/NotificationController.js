const express = require('express');
const router = express.Router();

const notificationService = require('../service/NotificationService');

/*
* Path for sending notifications
* */
router.post('/notification/send', async (req, res) => {

});

/*
* Path get all notifications for user logged
* */
router.get('/notification/:id', async (req, res) => {

});

module.exports = router;