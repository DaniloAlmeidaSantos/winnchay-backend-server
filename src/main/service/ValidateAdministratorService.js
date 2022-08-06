const UserRepository = require('../repositories/UsersRepository');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class ValidateAdministratorService {

    static async validateAdministrator(userId) {
        const userRepository = new UserRepository();

        try {
            logger.info(`Consulting user ${userId} is administrator.`);
            const isUserValid = await userRepository.findByAdministrator(userId);

            if (!isUserValid) {
                logger.info(`User ${userId} is not administrator...`);
                return false;
            }

            return true;
        } catch (error) {
            logger.info('Error to finding administrator');
            throw new Error(`Error to finding administrator: ${error}`);
        }
    }

}

module.exports = ValidateAdministratorService;
