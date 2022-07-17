const GameDTO = require('../model/dto/GameDTO');
const UsersRepository = require('../repositories/UsersRepository');
const GameRepository = require('../repositories/GameRepository');

// utils
const DateUtils = require('../utils/DateUtils');
const SortitionUtils = require('../utils/SortitionUtils');

class DrawGames {

    /*
    * Method for create championship
    * */
    async sortitionGames(gameDTO = new GameDTO(), userId) {
        const userRepository = new UsersRepository()
        const gameRepository = new GameRepository();

        try {
            const isUserValid = await userRepository.findByAdministrator(userId);
            let result = false;

            if (!isUserValid) {
                return false;
            }

            const teams = await gameRepository.findByTeamChampionship(gameDTO);
            result = await this.shuffleGames(teams);

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Method for insertition games in database
     */
    async shuffleGames(teams) {
        const gameRepository = new GameRepository();

        try {
            let shuffledGames = [];
            let result = false;

            for (let i = 0; i < teams.length; i++) {
                let teamFiltered = teams.filter(item => item != teams[i]);

                for (let j = 0; j < teamFiltered.length; j++) {
                    const game = new GameDTO();
                    game.gameIdChamp = teams[i].TCIDCHAMP;
                    game.gameIdTeam1 = teams[i].TCIDTEAM;
                    game.gameIdTeam2 = teamFiltered[j].TCIDTEAM;
                    shuffledGames.push(game);

                    result = await gameRepository.create(game);

                    if (!result) {
                        throw new Error(`Error ocurred in insert game ${teams[i].TCIDTEAM} X ${teamFiltered[j].TCIDTEAM}`);
                    }
                }
            }

            return [result, shuffledGames];
        } catch (error) {
            throw Error('Ocurred error on the shuffle games: ', error)
        }

    }
}

module.exports = DrawGames;