const express = require('express');
const router = express.Router();

const DrawGames = require("../service/DrawGamesService");
const RequestParticipateChampService = require('../service/RequestParticipateChampService');
const GameDTO = require('../model/dto/GameDTO');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";


/*
 * Path for return all clubs participate in the server
 */
router.get('/championship/clubs', async (req, res) => {

});

router.get('/championship/results', async (req, res) => {

});

router.post('/championship/request/participate/:userId', async (req, res) => {
    const { userId } = req.params.userId;
    const { teamId, championshipId } = req.body;

    try {
        const request = new RequestParticipateChampService();
        const response = await request.participateChampionship(userId, teamId, championshipId);

        if (response[0]) {
            res.status(202).json({ gamesShuflled: response[1] });
        } else {
            console.log(response[0])
            res.status(404).json({ message: response[1] });
        }
    } catch (error) {
        logger.error(`Occurred error in controller for request to championship: ${error}`);
        res.status(500).json({ message: "Error for request play championship", error: error });
    }
});

/*
* Path for creating championships
* */
router.post('/championship/shuffle/games/:id', async (req, res) => {
    const { userid } = req.params.id;
    const { idChamp } = req.body;

    const gameDTO = new GameDTO();
    gameDTO.gameIdChamp = idChamp;

    let drawGamesService = new DrawGames();

    try {
        const response = await drawGamesService.sortitionGames(gameDTO, userid);

        if (response[0]) {
            res.status(202).json({ gamesShuflled: response[1] });
        } else {
            console.log(response[0])
            res.status(404).json({ message: response[1] });
        }
    } catch (error) {
        logger.error(`Occurred error in controller for shuffle games: ${error}`);
        res.status(500).json({ message: "Error for shuffle games", error: error });
    }
});

module.exports = router;