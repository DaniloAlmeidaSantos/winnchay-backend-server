const GameDTO = require('../model/dto/GameDTO');
const ValidateUserAdm = require('./ValidateAdministratorService');
const GameRepository = require('../repositories/GameRepository');
const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class DrawGames {

    /*
    * Method for create championship
    * */
    async sortitionGames(gameDTO = new GameDTO(), userId) {
        const gameRepository = new GameRepository();

        try {
            const isValid = ValidateUserAdm.validateAdministrator(userId);

            if (!isValid) {
                return [false, "Error your not administrator in the team, please request the club administrator for create championship"];
            }

            logger.info('Finding teams in championship.');
            const teams = await gameRepository.findByTeamChampionship(gameDTO);
            let result = await this.#shuffleGames(teams);
            return result;            
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Method for insertition games in database
     */
    async #shuffleGames(teams) {
        const gameRepository = new GameRepository();

        try {
            let shuffledGames = [];
            let result = false;
            let round = 1;

            logger.info('Initializing shuffle games!');
            for (let i = 0; i < teams.length; i++) {
                let teamFiltered = teams.filter(item => item != teams[i]);

                for (let j = 0; j < teamFiltered.length; j++) {
                    const game = new GameDTO();
                    game.gameIdChamp = teams[i].TCIDCHAMP;
                    game.gameIdTeam1 = teams[i].TCIDTEAM;
                    game.gameIdTeam2 = teamFiltered[j].TCIDTEAM;
                    game.gameRound = `${round}`;
                    shuffledGames.push(game);

                    result = await gameRepository.create(game);

                    if (!result) {
                        throw new Error(`Error occurred in insert game ${teams[i].TCIDTEAM} X ${teamFiltered[j].TCIDTEAM}`);
                    }

                    round++;
                }
                round = 1;
            }

            logger.info(`Games shuffled: ${JSON.stringify(shuffledGames)}`);

            return [result, shuffledGames];
        } catch (error) {
            throw Error('Ocurred error on the shuffle games: ', error)
        }

    }
}

module.exports = DrawGames;