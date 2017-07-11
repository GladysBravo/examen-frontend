'use strict';

class NoIncluyeDirective {
    constructor() {
        this.restrict = 'A';
        this.require = 'ngModel';
    }

    link($scope, $elem, attr, ctrl) {
      ctrl.$validators.noDebeIncluir = (modelValue,viewValue) =>{
        let palabra = '';

        if(angular.isDefined(attr.noIncluye)){
          palabra = attr.noIncluye.toLowerCase();
          palabra = palabra.replace(/á/gi,"a");
          palabra = palabra.replace(/é/gi,"e");
          palabra = palabra.replace(/í/gi,"i");
          palabra = palabra.replace(/ó/gi,"o");
          palabra = palabra.replace(/ú/gi,"u");
          palabra = palabra.replace(/ñ/gi,"n");
          let REGEXP = new RegExp('^(.*?('+palabra+')[^$]*)$');
          let value = modelValue || viewValue;
          if(angular.isDefined(value) && angular.isString(value)){
              value = value.toLowerCase();
              value = value.replace(/á/gi,"a");
              value = value.replace(/é/gi,"e");
              value = value.replace(/í/gi,"i");
              value = value.replace(/ó/gi,"o");
              value = value.replace(/ú/gi,"u");
              value = value.replace(/ñ/gi,"n");
              value = value.replace(/\./gi,"");
          }
        return !(REGEXP.test(value));
        }
      };
    }
}

export default NoIncluyeDirective;
