class DateUtils {

    static dateValid(date) {
        const dataValidate = new Date(date);

        if (dataValidate > new Date()) {
            return true;
        }

        return false;
    }

}

module.exports = DateUtils;