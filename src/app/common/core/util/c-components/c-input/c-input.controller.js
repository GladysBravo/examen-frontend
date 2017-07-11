'use strict';

class CInputController {
    constructor() {
      this.mayuscula='mdmayuscula';
    }

    $onInit() {
        this.regexp = null;
        this.validation = '';
        let tipoValidacion = this.ngValidation;


        switch (tipoValidacion) {
          case 'correo':
            this.messageErrorPattern = 'Introduzca una dirección de correo válido.';
            this.validation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            this.mayuscula='';
            break;
          case 'celular':
            this.validation = /(6[0-9]{7}|7[0-9]{7})/;
            this.messageErrorPattern = 'Introduzca un número de celular válido';
            break;
          case 'telefono':
            //this.validation = /^([679]{1}[0-9]{7}|[2-9]{1}[0-9]{6}|(8001|9001)[0-9]{5})((,\s)([679]{1}[0-9]{7}|[2-9]{1}[0-9]{6}|(8001|9001)[0-9]{5}))*$/;
            this.validation = /^(\+((\d{3}|\d{2}))( |-)\d{5,15}|(\d{7})|(\d{8}))$/;
            this.messageErrorPattern = 'Introduzca un número de teléfono válido';
            break;
          case 'url':
            this.validation = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i;
            this.messageErrorPattern = 'Introduzca una dirección web válida.';
             this.mayuscula='';
            break;
          case 'numerico':
            this.validation = /^[0-9]+$/;
            this.messageErrorPattern = 'Introduzca sólo números';
            break;
          case 'monetario':
            this.validation = /^[0-9]|[0-9]+(\.[0-9]{1,2})+$/;
            this.messageErrorPattern = 'Introduzca sólo números';
            break;
          case 'texto':
            this.validation =/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;
            this.messageErrorPattern = 'Introduzca solo texto';
            break;
          case 'texto-numerico':
            this.validation = /^[0-9a-záéíóúñA-ZÁÉÍÓÚÑ."'&@\-\s]+$/;
            this.messageErrorPattern = 'Introduzca solo texto o numeros y caracteres permitidos';
            break;
          case 'texto-numerico-minusculas':
            this.validation = /^[0-9a-záéíóúñA-ZÁÉÍÓÚÑ."'&@\-\s]+$/;
            this.messageErrorPattern = 'Introduzca solo texto o numeros y caracteres permitidos';
            this.mayuscula='';
            break;
          case 'alfa-numerico':
            this.validation =  /^[a-zñA-ZÑ0-9-".'\s]/;
            this.messageErrorPattern = 'Introduzca solo texto, números o caracteres.';
            break;
          default:
            this.validation = null;
        }

        this.ngRequired = this.ngRequired != 'true' || angular.isUndefined(this.ngRequired) ? false : true;
       // this.ngDisabled = this.ngDisabled != 'true' || angular.isUndefined(this.ngDisabled)? false : true;
  }
}
export default CInputController;
