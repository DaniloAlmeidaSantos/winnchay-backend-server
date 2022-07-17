class ChampionshipDTO {
    champId;
    champName;
    champStartDate;
    champFinalDate;
    champAward;
    champType;

    constructor(champName, champStartDate, champFinalDate, champAward, champType) {
        this.champName = champName;
        this.champStartDate = champStartDate;
        this.champFinalDate = champFinalDate;
        this.champAward = champAward;
        this.champType = champType;
    }

    get champId() {
        return this.champId;
    }

    set champId(value) {
        this.champId = value;
    }

    get champName() {
        return this.champName;
    }

    set champName(value) {
        this.champName = value;
    }

    get champStartDate() {
        return this.champStartDate;
    }

    set champStartDate(value) {
        this.champStartDate = value;
    }

    get champFinalDate() {
        return this.champFinalDate;
    }

    set champFinalDate(value) {
        this.champFinalDate = value;
    }

    get champAward() {
        return this.champAward;
    }

    set champAward(value) {
        this.champAward = value;
    }

    get champType() {
        return this.champType;
    }

    set champType(value) {
        this.champType = value;
    }

}

module.exports = ChampionshipDTO;