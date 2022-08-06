const ValidateAdministratorService = require('./ValidateAdministratorService');
const SendNotificationService = require('./SendNotificationService');
const NotificationDTO = require('../model/dto/NotificationDTO');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class RequestParticipateChampService {

    async participateChampionship(userId, teamId, championshipId) {
        const sendNotification = new SendNotificationService();
        const notificationDto = new NotificationDTO();

        try {
            const isValid = await ValidateAdministratorService.validateAdministrator(userId);

            if (!isValid) {
                return [false, "Error your not administrator in the team, please request the club administrator for participate championship"];
            }

            notificationDto.notificationChampionshipSender(championshipId);
            

            const notificationSend = sendNotification.sendNotificationChampionship()

        } catch (error) {
            logger.error(`Error in request participate in Championship: ${error}`);
        }

        return 
    }

    async #validateTypeServer() {
        try {
            
        } catch (error) {
            throw new Error();
        }
    }

}

module.exports = RequestParticipateChampService;