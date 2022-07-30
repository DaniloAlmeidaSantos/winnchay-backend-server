const express = require('express');
const router = express.Router();
const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

const SendNotificationService = require('../service/SendNotificationService');
const NotificationDTO = require('../model/dto/NotificationDTO');

/*
* Path for sending notifications
* */
router.post('/notification/championship/send', async (req, res) => {
    const notificationDTO = new NotificationDTO();
    const notificationService = new SendNotificationService();

    try {
        const { teamId, championshipId, message, title } = req.body;

        notificationDTO.notificationMessage = message;
        notificationDTO.notificationChampionshipSender = championshipId;
        notificationDTO.notificationTitle = title;

        const response = notificationService.sendNotificationChampionship(notificationDTO, teamId);

        if (response) {
            res.status(200);
        }

        res.status(400).json({message: "Sending notification failed."});
    } catch (error) {
        logger.error(`Error in sending notification`);
        res.status(500).json({message: "Error in sending notification", error: error});
    }
});

/*
* Path get all notifications for user logged
* */
router.get('/notification/:id', async (req, res) => {

});

module.exports = router;