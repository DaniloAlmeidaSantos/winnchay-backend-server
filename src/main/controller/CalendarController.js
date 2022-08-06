const express = require('express');
const router = express.Router();

const CalendarService = require('../service/CalendarService');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

router.post('/calendar', async (req, res) => {
    try {
        
        const { teamId1, teamId2, isDetails } = req.body;

        const service = new CalendarService();
        
        logger.info(`Showing calendar...`);
        const response = await service.showGames(teamId1, teamId2, isDetails);
        if (response[0]) {
            logger.info(`Calendar founded: ${JSON.stringify(response[1])}`);
            res.status(200).json({calendar: response[1]});
        } else {
            logger.info('Error in showing calendar');
            res.status(404).json({message: 'Error in showing calendar'});
        }
    } catch (error) {
        logger.error('Occurred error in controller for get calendar...');
        res.status(500).json({message: "Error on getting calendar", error: error});
    }
});

module.exports = router;