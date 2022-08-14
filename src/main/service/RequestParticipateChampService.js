const ValidateAdministratorService = require('./ValidateAdministratorService');
const SendNotificationService = require('./SendNotificationService');
const NotificationDTO = require('../model/dto/NotificationDTO');
const ChampionshipRepository = require('../repositories/ChampionshipRepository');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class RequestParticipateChampService {

    async participateChampionship(userId, teamId, championshipId) {
        const sendNotification = new SendNotificationService();
        const notificationDto = new NotificationDTO();
        const championshipRepository = new ChampionshipRepository();

        try {
            const isInserted = championshipRepository.participateChampionship(teamId, championshipId);

            if (isInserted) {
                const isValid = await ValidateAdministratorService.validateAdministrator(userId);

                if (!isValid) {
                    return [false, "Error your not administrator in the team, please request the club administrator for participate championship"];
                }

                logger.info('Sending notifications for players in the team.');
                notificationDto.notificationChampionshipSender(championshipId);
                const isSended = sendNotification.sendNotificationChampionship()

                if (isSended) {
                    return [true, "Your team partipated in championship"];
                } else {
                    return [true, "Your team partipated in championship, but notification not sended"];
                }
            }
        } catch (error) {
            logger.error(`Error in request participate in Championship: ${error}`);
        }

        return [false, "Error in acceptance team in championship."]
    }

}

module.exports = RequestParticipateChampService;