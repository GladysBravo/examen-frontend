'use strict';

class DocumentoIdentidadController {

    constructor($scope, DataService, Datetime, Message, $log) {
        'ngInject';
        this.$scope = $scope;
        this.DataService = DataService;
        this.Datetime = Datetime;
        this.Message = Message;
        this.$log = $log;
        // this.init = false;
    }

    $onInit () {

      // this.$log.log('DocumentoIdentidadController init');
      // this.$log.log(this);
      if (!this.ngModel) this.ngModel = {};

      this.initDefault('tipo_documento', 'CARNET_IDENTIDAD');
    }

    isCI () {
      return this.ngModel.tipo_documento=='CARNET_IDENTIDAD';
    }

    isFill () {
      return this.ngModel.nombres && this.ngModel.primer_apellido;
    }

    initDefault (key, val) { if (!this.ngModel[key]) this.ngModel[key] = val; }

    changeType() {
        this.nombreDel();
    }

    nombreDel () {
      delete this.ngModel.nombres;
      delete this.ngModel.primer_apellido;
      delete this.ngModel.segundo_apellido;
      delete this.ngModel.id_persona;
    }

    isDisabled() {
        return angular.isUndefined(this.ngModel.documento_identidad)  || !this.Datetime.isDate(this.ngModel.fecha_nacimiento);
    }

    search() {
      // this.Message.loading("Buscando datos en el SEGIP, esta operación puede demorar.");
      var ci, complemento, datos;
      if (this.ngModel.documento_identidad.indexOf('-') !== -1) {
        datos = this.ngModel.documento_identidad.split('-');
        ci = datos[0];
        complemento = datos[1];
      } else {
        ci = this.ngModel.documento_identidad;
      }
      // this.$log.log(ci,complemento,datos);

      this.DataService.get(`persona/servicio/segip/?ci=${ci}&fecha_nacimiento=${this.Datetime.format(this.ngModel.fecha_nacimiento,'YYYY/MM/dd')}${complemento?'&complemento='+complemento.toUpperCase():''}`)
      .then( response => {
        // this.$log.log(response);
        this.nombreDel();
        if (response) {
          this.ngModel.primer_apellido = response.primer_apellido;
          this.ngModel.segundo_apellido = response.segundo_apellido;
          this.ngModel.nombres = response.nombres;
          this.ngModel.id_persona = response.id_persona;
        }
      });
    }
}

export default DocumentoIdentidadController;
