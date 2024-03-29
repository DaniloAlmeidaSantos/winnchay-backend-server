const express = require('express');
const router = express.Router();
const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

const SendNotificationService = require('../service/SendNotificationService');
const ShowNotificationService = require('../service/ShowNotificationsService');
const NotificationDTO = require('../model/dto/NotificationDTO');

/*
* Path for sending notifications
* */
router.post('/notification/championship/send', async (req, res) => {
    const notificationDTO = new NotificationDTO();
    const notificationService = new SendNotificationService();

    try {
        const { teamId, championshipId, message, title } = req.body;
        
        notificationDTO.setNotificationMessage = message;
        notificationDTO.setNotificationChampionshipSender = championshipId;
        notificationDTO.setNotificationTitle = title;

        const response = await notificationService.sendNotificationChampionship(notificationDTO, teamId);
        if (response) {
            res.status(200).json({message: "Message send success for inbox..."});
        } else {
            res.status(400).json({message: "Sending notification failed."});
        }
    } catch (error) {
        logger.error(`Error in sending notification`);  
        logger.error(error);
    }
});

/*
* Path get all notifications for user logged
* */
router.get('/notification/:userId', async (req, res) => {
    const { userId } = req.params.userId;
    const service = new ShowNotificationService();

    try {
        const response = await service.showNotification(userId);

        res.status(200).json({notifications: response});
    } catch (error) {
        logger.error(`Error to finding notification`);  
        logger.error(error);
    }
});

module.exports = router;