const db = require('../config/db_config');
const GameDTO = require('../model/dto/GameDTO');
const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class GameRepository {

    async create(gameDTO = new GameDTO()) {
        try {
            logger.info('Validating championship...');
            const isValid = await db.raw('SELECT CHAMPID FROM WINNCHAMPIONSHIPS WHERE CHAMPID = ?', [gameDTO.gameIdChamp]);

            if (!isValid) {
                logger.info('Championship not valid');
                return false;
            }

            let insertResult = await db.insert(
                {
                    GAMEIDCHAMP: gameDTO.gameIdChamp,
                    GAMEIDTEAM1: gameDTO.gameIdTeam1,
                    GAMEIDTEAM2: gameDTO.gameIdTeam2,
                    GAMEROUND: gameDTO.gameRound
                }
            ).table('WINNGAMES');

            return insertResult != undefined;
        } catch (error) {
            logger.error('Error to insert games');
            throw new Error(`Ocurred error in insert game in database: ${error}`);
        }

    }

    findByTeamChampionship(gameDTO = new GameDTO()) {
        try {
            const teams = db.select().where({ TCIDCHAMP: gameDTO.gameIdChamp }).table('WINNTEAMS_CHAMPS')
            return teams;
        } catch (error) {
            logger.error(`Error to find teams in championship...`);            
            throw new Error(error);
        }
    }

    async findCalendar(teamId) {
        try {
            const games = await db.raw(
                'SELECT T1.TEAMNAME, T2.TEAMNAME, G.GAMEDATE FROM WINNGAMES G LEFT JOIN WINNTEAMS T1 ON T1.TEAMID = G.GAMEIDTEAM1 LEFT JOIN WINNTEAMS T2 ON T2.TEAMID = G.GAMEIDTEAM2 WHERE T1.TEAMID = ? AND G.GAMEDATE IS NOT NULL',
                [teamId]
            );

            return games;
        } catch (error) {
            logger.error(`Error to find games for team...`);            
            throw new Error(error);
        }
    }

    async detailsGame(teamId1, teamId2) {
        try {
            const game = await db.raw(
                'SELECT T1.TEAMNAME TEAM1, T2.TEAMNAME TEAM2, G.GAMEDATE FROM WINNGAMES G LEFT JOIN WINNTEAMS T1 ON T1.TEAMID = G.GAMEIDTEAM1 LEFT JOIN WINNTEAMS T2 ON T2.TEAMID = G.GAMEIDTEAM2  WHERE T1.TEAMID = ? AND T2.TEAMID = ?  AND G.GAMEDATE IS NOT NULL',
                [teamId1, teamId2]
            );

            return game;
        } catch (error) {
            logger.info(`Error in select details games`);
            throw new Error(`Error in select details games: ${error}`);
        }
    }
}

module.exports = GameRepository;