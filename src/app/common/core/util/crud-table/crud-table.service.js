'use-strict';

class CrudTableService {
    constructor($injector) {
        'ngInject';

        this.$injector = $injector;
    }

    filterFields(data, fields) {
        if (typeof fields == 'undefined' || fields.length === 0) {
            return data;
        }
        var filter = [];
        for (var i in fields) {
            var field = this.searchField(data, fields[i]);
            if (field) {
                filter.push(field);
            }
        }
        return filter;
    }

    searchField(fields, field) {
        for (var i in fields) {
            if (fields[i].key == field) {
                return fields[i];
            }
        }   
        return null;
    } 

    searchFieldData(fields, field) {
        for (var i in fields) {
            if (fields[i].key == field) {
                return fields[i].value;
            }
        }   
        return field;
    } 

    addPropertiesFormly(data, formly) {
        if (typeof formly == 'undefined' || formly.length === 0) {
            return data;
        }
        for (var i in data) {
            var field = this.searchField(formly, data[i].key);
            if (field) {
                data[i] = angular.merge({}, data[i], field);
            }
        }
        return data;
    }    

    parseSave(data, formly) {
        var Datetime = this.$injector.get('Datetime');                
        var item = {};
        for (var i in data) {
            if (this.toType(data[i]) == 'date') {
                item[i] = Datetime.format(data[i], 'YYYY-MM-dd');
            } else {
                if (typeof data[i] == 'string' && (data[i] == 'true' || data[i] == 'false')) {
                    item[i] = item[i] == 'true'; 
                } else {
                    item[i] = data[i];
                }
            }
        }
        item.id = this.getId(item, formly);
        return item;
    }

    getId(formly, item) {
        for (var i in formly) {
            if (formly[i].templateOptions.label && formly[i].templateOptions.label == 'ID') {
                if (item) {
                    return item[formly[i].key];
                } else {
                    return formly[i].key;
                }
            }
        }
        return null;
    }

    getFkData(fieldsData, key, value) {
        fieldsData.filter((e) => {
            if (e.key == key && e.templateOptions.options) {
                e.templateOptions.options.filter((elem) => {
                    if (elem.value == value) {
                        value = elem.name;
                    }
                });
            }
        });
        return value;
    }

    filterItem(data) {
        var Datetime = this.$injector.get('Datetime');
        for (var i in data) {
            if (typeof data[i] == 'string') {
                if (Datetime.isDate(new Date(data[i]))) {
                    data[i] = new Date(data[i]);
                } else if (!/[a-zA-Z]+/g.test(data[i]) && /^-?[0-9.]+\:?[0-9]+\:?[0-9]*$/g.test(data[i]) && data[i].length == 8) {
                    // data[i] = formatTime(data[i]);
                }
            }
        }
        return data;
    }

    // formatTime(time) {
    //     time = time.split(':');
    //     return [time[0], time[1]].join(':');
    // } 
}

export default CrudTableService;