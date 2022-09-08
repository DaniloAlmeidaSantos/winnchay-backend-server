const NotificationRepository = require('../repositories/NotificationRepository');
const NotificationDTO = require('../model/dto/NotificationDTO');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

class ShowNotificationService {

    async showNotification(userId) {
        const notificationRepository = new NotificationRepository();

        try {
            const result = await notificationRepository.getNotification(userId);
            const response = [];

            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    response.push(
                        new NotificationDTO(
                            result[i].NTIDUSERSENDER,
                            result[i].NTIDUSERDEST,
                            result[i].NTTYPE,
                            result[i].NTSTATUS,
                            result[i].NTMESSAGE,
                            result[i].NTTITLE,
                            result[i].NTREQACCEPT,
                            result[i].NTIDCHAMPIONSHIPSENDER,
                            result[i].NTIDTEAMSENDER
                        )
                    );
                }
            }

            return response;
        } catch (error) {
            logger.error(`Error in showing notification for user: ${error}`);
        }
    }

}

module.exports = ShowNotificationService;
