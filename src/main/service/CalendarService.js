const GameRepository = require('../repositories/GameRepository');
const repository = new GameRepository();

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class CalendarService {

    async showGames(teamId1, teamId2, isDetail) {
        try {
            let result = false;

            // Details in game
            if (isDetail) {
                logger.info('Searching details in game');
                return this.#gamesDetails(teamId1, teamId2);
            }

            logger.info('Finding calendar in database.');
            let response = await repository.findCalendar(teamId1);

            if (response[0].length > 0) {
                result = true;    
            }

            return [result, response[0]];            
        } catch (error) {
            logger.error(`Erro in showing games in calendar`);
            throw new Error(`Error in show games in calendar: ${error}`);
        }
    }

    async #gamesDetails(teamId, teamId2) {
        try {
            let result = false;
            let response = repository.detailsGame(teamId, teamId2);

            if (response.length > 0) {
                result = true;    
            }

            return [result, response];
        } catch (error) {
            logger.error(`Error to find details in game ${teamId} x ${teamId2}`);
            throw new Error(`Error in find details games ${error}`);
        }
    }
}

module.exports = CalendarService;