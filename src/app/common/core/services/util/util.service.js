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

    size(obj) {
        return Object.keys(obj).length;
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

    getKeys(data) {
        var types = {};

        data.map((el) => {
            types[el.key] = el;
        });

        return types;
    }
    
}

export default UtilService;
