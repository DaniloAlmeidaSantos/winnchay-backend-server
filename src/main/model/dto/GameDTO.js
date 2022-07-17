class GameDTO {
    gameIdChamp;
    gameIdTeam1;
    gameIdTeam2;
    gameResult1;
    gameResult2;
    gameDate;
    gameRound;


    constructor(gameIdChamp, gameIdTeam1, gameIdTeam2, gameResult1, gameResult2, gameDate, gameRound) {
        this.gameIdChamp = gameIdChamp;
        this.gameIdTeam1 = gameIdTeam1;
        this.gameIdTeam2 = gameIdTeam2;
        this.gameResult1 = gameResult1;
        this.gameResult2 = gameResult2;
        this.gameDate = gameDate;
        this.gameRound = gameRound;
    }

    get gameIdChamp() {
        return this.gameIdChamp;
    }

    set gameIdChamp(value) {
        this.gameIdChamp = value;
    }

    get gameIdTeam1() {
        return this.gameIdTeam1;
    }

    set gameIdTeam1(value) {
        this.gameIdTeam1 = value;
    }

    get gameIdTeam2() {
        return this.gameIdTeam2;
    }

    set gameIdTeam2(value) {
        this.gameIdTeam2 = value;
    }

    get gameResult1() {
        return this.gameResult1;
    }

    set gameResult1(value) {
        this.gameResult1 = value;
    }

    get gameResult2() {
        return this.gameResult2;
    }

    set gameResult2(value) {
        this.gameResult2 = value;
    }

    get gameDate() {
        return this.gameDate;
    }

    set gameDate(value) {
        this.gameDate = value;
    }

    get gameRound() {
        return this.gameRound;
    }

    set gameRound(value) {
        this.gameRound = value;
    }
}

module.exports = GameDTO;