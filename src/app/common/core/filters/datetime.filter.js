'use strict';

const DatetimeFilter = (Datetime) => {

    return (date, format) => {

        if (format) {
            if (format == 'literal') {
                return Datetime.dateLiteral(date);
            }
            if (format == 'year') {
                return Datetime.now('YYYY');
            }
            if (format == 'timeLiteral') {
                return Datetime.timeLiteral(date);
            }
            if (format == 'convert') {
                if (date && typeof date == 'string') {
                    var pos = date.indexOf('T');
                    if (pos != -1 && pos <= 10 && pos >= 8) {
                        var fecha = date.substring(0, pos);
                        if (!/[a-zA-Z]+/g.test(fecha) && /^-?[0-9.]+\-?[0-9]+\-?[0-9]*$/g.test(fecha)) {
                            fecha = fecha.split('-');
                            return Datetime.format(new Date(fecha[0], parseInt(fecha[1]) - 1, fecha[2]));
                        }
                    }
                }
                return date;
            }
        }

        return date;
    };
};

export default DatetimeFilter;