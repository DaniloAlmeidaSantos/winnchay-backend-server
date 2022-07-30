const express = require('express');
const router = express.Router();

const CalendarService = require('../service/CalendarService');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

router.post('/calendar', (req, res) => {
    try {
        
        const { teamId1, teamId2, isDetails } = req.body;

        const service = new CalendarService();

        const response = service.showGames(teamId1, teamId2, isDetails);

        if (response[0]) {
            res.status(200).json({calendar: response[1]});
        }

        res.status(404);
    } catch (error) {
        logger.error('Occurred error in controller for get calendar...');
        res.status(500).json({message: "Error on getting calendar", error: error});
    }
});

module.exports = router;