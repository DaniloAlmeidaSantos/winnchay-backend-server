const NotificationDTO = require('../model/dto/NotificationDTO');
const UsersRepository = require('../repositories/UsersRepository');
const NotificationRepository = require('../repositories/NotificationRepository');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class SendNotificationService {

    /**
     * Method to send notify for all players in the team, because team participate in championship
     * 
     * @param {NotificationDTO} notificationDTO 
     */
    async sendNotificationChampionship(notificationDTO = new NotificationDTO(), teamId) {
        const userRepository = new UsersRepository();
        const notficattionRepository = new NotificationRepository();

        try {
            const players = await userRepository.searchPlayers(teamId);
            
            if (players[0].length <= 0) {
                logger.info('Players not found');
                return false;
            }
             
            logger.info(`Sending notification for players in the team ${teamId}`);
            for (let i = 0; i < players; i++) {
                notificationDTO.notificationStatus = "S";
                notificationDTO.notificationType = "C";
                notificationDTO.notificationUserDest = players[i].USID;
                notficattionRepository.create(notificationDTO);
            }

            return true;
        } catch (error) {
            logger.error(`Error occurred in NotificationService.`);
            throw new Error('Error occurred in send notification: ' + error);
        }

    }

}

module.exports = SendNotificationService;