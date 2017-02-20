'use strict';

class UtilService {
    
    constructor($injector) {
        "ngInject";

        this.$injector = $injector;
    }

    $onInit() {
        this.tmpl_print = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <title>Document</title>
                <style>{css}</style>
            </head>
            <body>{body}</body>
            </html>`;
    }

    toType (obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    isJson (text) {
        return /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
    }

    stripHTML(texto) {
        return texto.replace(/(<([^>]+)>)/ig,"");
    }

    nano (template, data) {
        return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
            var keys = key.split("."), v = data[keys.shift()];
            for (var i = 0, l = keys.length;i < l;i++)
                v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        });
    }

    print (html, css) {
        if (typeof css == 'string') {
            angular.element.get(css, (response) => {
                var popup = window.open('', 'print');
                popup.document.write(this.nano(this.tmpl_print, {body : html, css : response}));
                popup.document.close();
                popup.focus();
                popup.print();
                popup.close();
            });
        } else {
            var popup = window.open('', 'print');
            popup.document.write(this.nano(this.tmpl_print, {body : html, css : css}));
            popup.document.close();
            popup.focus();
            popup.print();
            popup.close();
        }

        return true;
    }

    popup(url) {
        window.open(url, 'print');
    }

    fullscreen () {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
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
                data[i] = angular.element.extend(true, {}, data[i], field);
            }
        }
        return data;
    }

    size(obj) {
        return Object.keys(obj).length;
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

    getId(item, formly, key) {
        if (item) {
            for (var i in formly) {
                if (formly[i].templateOptions.label && formly[i].templateOptions.label == 'ID') {
                    if (key) {
                        return formly[i].key;
                    } else {
                        return item[formly[i].key];
                    }
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

    serialize(json) {
        var string = [];
        for (var i in json) {
            string.push(i + '=' + json[i]);
        }
        return string.join('&');
    }

    getMenuOption(menu, url) {
        for (var i in menu) {
            if (typeof menu[i].submenu != 'undefined') {
                var pages = menu[i].submenu;
                for (var j in pages) {
                    if (pages[j].url == url) {
                        return [menu[i].label, pages[j].label];
                    }
                }
            }
        }
        for (var k in menu) {
            if (menu[k].url == url) {
                return [menu[k].label, false];
            }
        }
        return [false,false];
    }

    lengthOptions(data, key) {
        for (var i in data) {
            if (data[i].key == key && data[i].templateOptions && data[i].templateOptions.options) {
                return data[i].templateOptions.options.length;
            }
        }
        return 0;
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

    getKeys(data) {
        var types = {};

        data.map((el) => {
            types[el.key] = el;
        });

        return types;
    }
    
}

export default UtilService;
