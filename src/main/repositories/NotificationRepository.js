const db = require('../config/db_config');
const NotificationDTO = require('../model/dto/NotificationDTO');
const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class NotificationRepository {

    /**
     * Inserting notifications in database 
     * 
     * @param {NotificationDTO} notificationDTO 
     * @returns 
     */
    async create(notificationDTO = new NotificationDTO()) {
        try {
            logger.info(`Initializing save notification...`);
            logger.info(JSON.stringify(notificationDTO));
            const result = await db.insert(
                {
                    NTIDUSERSENDER: notificationDTO.notificationUserSender,
                    NTIDUSERDEST: notificationDTO.notificationUserDest,
                    NTTYPE: notificationDTO.notificationType,
                    NTSTATUS: notificationDTO.notificationStatus,
                    NTMESSAGE: notificationDTO.notificationMessage,
                    NTTITLE: notificationDTO.notificationTitle
                }
            ).table('WINNNOTIFICATIONS');

            return result.lenght > 0;
        } catch (error) {
            logger.error(`Erro in database for inserting notification`);
            throw new Error(`Error on inserting notification: ${error}`);
        }
    }

}

module.exports = NotificationRepository;