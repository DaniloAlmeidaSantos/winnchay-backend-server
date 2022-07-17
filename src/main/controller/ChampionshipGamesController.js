const express = require('express');
const router = express.Router();

const DrawGames = require("../service/DrawGamesService");
const GameDTO = require('../model/dto/GameDTO');


/*
 * Path for return all clubs participate in the server
 */
router.get('/championship/clubs', async (req, res) => {

});

router.get('/championship/results', async (req, res) => {

});

/*
* Path for creating championships
* */
router.post('/championship/shuffle/games', async (req, res) => {
    // const { userid } = req.params;
    const userId = 1;
    const { idChamp, idTeam1, idTeam2, gameResult1, gameResult2, gameDate, gameRound } = req.body;

    let gameDTO = new GameDTO(idChamp, idTeam1, idTeam2, gameResult1, gameResult2, gameDate, gameRound);

    let drawGamesService = new DrawGames();
    
    try {
        const response = await drawGamesService.sortitionGames(gameDTO, userId).catch(err => console.log(err));

        if (response[0]) {
            res.status(202).json({gamesShuflled: response[1]});
        } else {
            res.status(404);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500);
    }

});

module.exports = router;