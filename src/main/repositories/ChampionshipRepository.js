const db = require('../config/db_config');
const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class ChampionshipRepository {

    async participateChampionship(teamId, championshipId) {

        try {

            const isInserted = await db.insert(
                {
                    TCIDCHAMP: championshipId,
                    TCIDTEAM: teamId
                }
            ).table('WINNTEAMS_CHAMPS');

            return isInserted.length > 0;

        } catch (error) {
            logger.error(`Error in team participated in championship ${error}`);
            throw new Error(`Error in participate team in championship in database: ${error}`);
        }
        
    }

}

module.exports = ChampionshipRepository;
