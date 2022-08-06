const db = require('../config/db_config');
const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class UsersRepository {

    /**
     * Verify if user is administrator in one team
     * 
     * @param {BigInteger} userID 
     * @returns 
     */
    async findByAdministrator(userID) {
        try {
            const result = await db.raw(
                "SELECT U.USUID FROM WINNUSERS U JOIN WINNADMINISTRATORS A ON U.USUID = A.ADMUSER WHERE USUID = ?",
                [userID]
            );
    
            if (result[0].length > 0) {
                logger.info(`Administrator by team founded: ${result[0]}`);
                return true;
            }
    
            logger.info(`Administrator not found`);
            return false;   
        } catch (error) {
            logger.error(`Occurred error in finding administrator: ${error}`);
            throw new Error(`Occurred erro in searching administrator`);
        }
    }

    /**
     * Consulting players in the team
     * 
     * @param {BigInteger} teamId 
     * @returns 
     */
    async searchPlayers(teamId) {
        try {
            const players = await db.where({USUIDTEAM: teamId}).select('USUID').table('WINNUSERS');

            if (players.length > 0) {
                logger.info(`Players found by team: ${JSON.stringify(players[0])}`);
                return players;
            }

            logger.info(`Players not found by team`);
            return null;
        } catch (error) {
            logger.error(`Occurred error in search players for team ${teamId}: ${error}`);
            throw new Error("Occurred erro in searching players");
        }
    }

    /**
     * Finding user by id
     * 
     * @param {BigInteger} userId 
     * @returns 
     */
    async findById(userId) {
        try {
            const userFounded = await db.where({USUID: userId}).select().table('WINNUSERS');

            if (userFounded[0].length > 0) {
                logger.info(`User found by team: ${userFounded[0]}`);
                return players
            }

            logger.info(`User not found by team`);
            return null;
        } catch (error) {
            logger.error(`Occurred error in search user by id ${userId}: ${error}`);
            throw new Error(`Occurred error in search user`);
        }
    }

}

module.exports = UsersRepository;