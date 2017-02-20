'use strict';

class FilterService {

    constructor() {
        
    }

    $onInit() {
        this.exceptions = {
            integer      : [46, 8, 9, 27, 13, 110, 190, 173],
            natural      : [46, 8, 9, 27, 13, 110, 190],
            decimal      : [46, 8, 9, 27, 13, 110, 188, 190, 173],
            numeric      : [46, 8, 9, 27, 13],
            alpha        : [46, 8, 9, 27, 13],
            alpha_dash   : [46, 8, 9, 27, 13, 173]
        };
        this.exceptions.alpha_numeric = this.exceptions.alpha;
        
        this.evaluate = {
            numeric : function (e) {
                return (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105);
            },
            alpha : function (e) {
                return e.shiftKey || (e.keyCode < 65 || e.keyCode > 90);
            }
        };

        this.evaluate.integer = this.evaluate.numeric;
        this.evaluate.decimal = this.evaluate.numeric;
        this.evaluate.natural = this.evaluate.numeric;     
        this.evaluate.alpha_numeric = function (e) {
            return this.evaluate.alpha(e) && this.evaluate.numeric(e);
        };                
        this.evaluate.alpha_dash = this.evaluate.alpha_numeric;
    }


    nit() {
        let nit = {
            verhoeff : (x, y) => {
                var m = ['0123456789', '1234067895', '2340178956', '3401289567', '4012395678', '5987604321', '6598710432', '7659821043', '8765932104', '9876543210'];
                if (m[x] && m[x][y]) {
                    return parseInt(m[x][y]);
                }
                return -1;
            },
            
            permutations : (x, y) =>  {
                var m = ['0123456789', '1576283094', '5803796142', '8916043527', '9453126870', '4286573901', '2793806415', '7046913258'];
                if (m[x] && m[x][y]) {
                    return parseInt(m[x][y]);
                }
                return -1;
            },
            
            evaluate : (num) => {
                var check = 0, x, y, z;
            
                if (typeof num == 'string' && isNaN(num)) {
                    return false;
                }
                num = parseInt(num);
                for (var i = 0, l = num.toString().length; i < l; i++) {
                    x = i % 8;
                    y = num % 10;
                    num = Math.floor(num/10);
                    z = nit.permutations(x, y);
                    check = nit.verhoeff(check, z);
                }
            
                return check === 0;
            }
        };

        return nit;
    }

    filterBase (e, type) {
        if (this.exceptions[type].indexOf(e.keyCode) !== -1 || (e.keyCode == 86 && e.ctrlKey === true) || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }   
        if (this.evaluate[type](e)) {
            e.preventDefault();
        }
    }

    isNumber(o) {
        return typeof o === 'number' && isFinite(o);
    }
    
    isFloat(value) {
        return value % 1 !== 0;
    }
    
    integer(e) {
        this.filterBase(e, 'integer');
    }
    
    isInteger(value) {
        if (/[a-zA-Z]+/g.test(value) || !/^-?[0-9.]*$/g.test(value)) {
            return false;
        }
        value = this.convert(value);
        if (value === 'NaN' || !this.isNumber(value)) {
            return false;
        }
        return !this.isFloat(value);
    }
    
    decimal(e) {
        this.filterBase(e, 'decimal');
    }
    
    isDecimal(value) {
        if (/[a-zA-Z]+/g.test(value) || !/^-?[0-9.]+\,?[0-9]*$/g.test(value)) {
            return false;
        }
        value = this.convert(value);
        if (value === 'NaN') {
            return false;
        }
        return this.isNumber(value);
    }
    
    natural(e) {
        this.filterBase(e, 'natural');
    }

    isNatural(value) {
        if (/[a-zA-Z]+/g.test(value) || !/^[0-9]*$/g.test(value)) {
            return false;
        }
        value = this.convert(value);
        if (value === 'NaN' || !this.isNumber(value)) {
            return false;
        }
        return !this.isFloat(value) && value >= 0;
    }
    
    numeric(e) {
        this.filterBase(e, 'numeric');
    }
    
    isNumeric(value) {
        return /^([0-9])*$/.test(value);
    }
    
    alpha(e) {
        this.filterBase(e, 'alpha');
    }
    
    isAlpha(value) {
        return /^[\u00F1A-Za-z]*$/.test(value);
    }
    
    alphaNumeric(e) {
        this.filterBase(e, 'alpha_numeric');
    }
    
    isAlphaNumeric(value) {
        return /^[\u00F1A-Za-z0-9]*$/.test(value);
    }
    
    alphaDash(e) {
        this.filterBase(e, 'alpha_dash');
    }
    
    isAlphaDash(value) {
        return /^[\u00F1A-Za-z-_0-9]*$/.test(value);
    }
    
    removeTagHTML(text) {
        return text.replace(/<([^ >]+)[^>]*>.*?<\/\1>|<[^\/]+\/>/gi, "");
    }

    empty(value) {
        return value === null || value.length === 0 || /^\s+$/.test(value);
    }

    isEmail(value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value); 
    }

    convert(value) {
        return parseFloat(isNaN(value) ? value.replace(/\./g, '').replace(',', '.') : value);
    }

    isNit(value) {
        return this.nit().evaluate(value);
    }
}

export default FilterService;