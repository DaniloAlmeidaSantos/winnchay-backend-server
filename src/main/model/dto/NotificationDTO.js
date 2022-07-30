class NotificationDTO {

    notificationId;
    notificationUserSender;
    notificationTeamSender;
    notificationChampionshipSender;
    notificationUserDest;
    notificationType;
    notificationStatus;
    notificationMessage;
    notificationTitle;
    notificationRequestAccept;
    notificationDateSend;

    constructor(
        notificationUserSender, 
        notificationUserDest, 
        notificationType, 
        notificationStatus,
        notificationMessage,
        notificationTitle,
        notificationRequestAccept,
        notificationChampionshipSender,
        notificationTeamSender
    ) {
        this.notificationUserSender = notificationUserSender;
        this.notificationUserDest = notificationUserDest;
        this.notificationType = notificationType;
        this.notificationStatus = notificationStatus;
        this.notificationMessage = notificationMessage;
        this.notificationTitle = notificationTitle;
        this.notificationRequestAccept = notificationRequestAccept;
        this.notificationTeamSender = notificationTeamSender;
        this.notificationChampionshipSender = notificationChampionshipSender;
    }

    get notificationId() {
        return this.notificationId;
    }

    set notificationId(value) {
        this.notificationId = value;
    }

    get notificationUserSender() {
        return this.notificationUserSender;
    }

    set notificationUserSender(value) {
        this.notificationUserSender = value;
    }

    get notificationUserDest() {
        return this.notificationUserDest;
    }

    set notificationUserDest(value) {
        this.notificationUserDest = value;
    }

    get notificationType() {
        return this.notificationType;
    }

    set notificationType(value) {
        this.notificationType = value;
    }

    get notificationStatus() {
        return this.notificationStatus;
    }

    set notificationStatus(value) {
        this.notificationStatus = value;
    }

    get notificationMessage() {
        return this.notificationMessage;
    }

    set notificationMessage(value) {
        this.notificationMessage = value;
    }

    get notificationTitle() {
        return this.notificationTitle;
    }

    set notificationTitle(value) {
        this.notificationTitle = value;
    }

    get notificationRequestAccept() {
        return this.notificationRequestAccept;
    }

    set notificationRequestAccept(value) {
        this.notificationRequestAccept = value;
    }

    get notificationDateSend() {
        return this.notificationDateSend;
    }

    set notificationDateSend(value) {
        this.this.notificationDateSend = value;
    }

    get notificationTeamSender() {
        return this.notificationTeamSender;
    }

    set notificationTeamSender(value) {
        this.this.notificationTeamSender = value;
    }

    get notificationChampionshipSender() {
        return this.notificationChampionshipSender;
    }

    set notificationChampionshipSender(value) {
        this.this.notificationChampionshipSender = value;
    }
}

module.exports = NotificationDTO;