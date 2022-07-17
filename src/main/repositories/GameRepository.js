const db = require('../config/db_config');
const GameDTO = require('../model/dto/GameDTO');

class GameRepository {

    findAll(gameDTO = new GameDTO()) {
        const games = db.select().table('WINNGAMES');

        return games;
    }

    async create(gameDTO = new GameDTO()) {
        try {
            const isValid = await db.raw('SELECT CHAMPID FROM WINNCHAMPIONSHIPS WHERE CHAMPID = ?', [gameDTO.gameIdChamp]);

            if (!isValid) {
                return false;
            }

            let insertResult = await db.insert(
                {
                    GAMEIDCHAMP: gameDTO.gameIdChamp,
                    GAMEIDTEAM1: gameDTO.gameIdTeam1,
                    GAMEIDTEAM2: gameDTO.gameIdTeam2
                }
            ).table('WINNGAMES');

            return insertResult != undefined;
        } catch (error) {
            throw new Error(`Ocurred error in insert game in database: ${error}`);
        }

    }

    findByTeamChampionship(gameDTO = new GameDTO()) {
        const teams = db.select().where({ TCIDCHAMP: gameDTO.gameIdChamp }).table('WINNTEAMS_CHAMPS')
        return teams;

    }
}

module.exports = GameRepository;