'use strict';

class SelectMunicipioController {

    constructor($scope, $log, DataService) {
        'ngInject';
        this.$scope = $scope;
        this.$log = $log;
        this.DataService = DataService;
    }

    $onInit () {
      // this.$log.log(this);

      this.departamentosLoad();
      this.init_provincias = this.provincia;
      this.init_municipios = this.municipio;
      this.$scope.$watch('$ctrl.departamento', ()=>{
        // this.$log.log('departamentoChange', this);
        if (this.departamento) {
          this.provinciasLoad();
        }
      })
      this.$scope.$watch('$ctrl.provincia', ()=>{
        if (this.provincia) {
          this.municipiosLoad();
        }
      })
    }

    departamentosLoad () {
      this.departamentos = [];
      this.provincias = [];
      this.municipios = [];

      this.DataService.get(`departamento`)
      .then( (response) => {
        if (response) {
          this.departamentos = response;
        }
      })
    }

    provinciasLoad () {
      this.provincias = [];
      this.municipios = [];
      if (!this.init_provincias) {
        delete this.provincia;
        delete this.municipio;
      }
      this.init_provincias = !1;

      this.DataService.get(`provincia/departamento/${this.departamento}`)
      .then( (response) => {
        if (response) {
          this.provincias = response;
        }
      })
    }

    municipiosLoad () {
      this.municipios = [];
      if (!this.init_municipios) {
        delete this.municipio;
      }
      this.init_municipios = !1;
      this.DataService.get(`municipio/provincia/${this.provincia}`)
      .then( (response) => {
        if (response) {
          this.municipios = response;
        }
      })
    }

}


export default SelectMunicipioController;
