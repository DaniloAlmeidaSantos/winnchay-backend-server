const db = require('../config/db_config');

class UsersRepository {

    async findByAdministrator(userID) {

        const result = await db.raw(
            "SELECT U.USUID FROM WINNUSERS U JOIN WINNADMINISTRATORS A ON U.USUID = A.ADMUSER WHERE USUID = ?",
            [userID]
        );

        if (result[0].length > 0) {
            return true;
        }

        return false;
    }

}

module.exports = UsersRepository;