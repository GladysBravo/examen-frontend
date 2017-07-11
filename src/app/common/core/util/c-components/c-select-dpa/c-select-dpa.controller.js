'use strict';

class CSelectDPAController {
    constructor(DataService,restUrl,Message) {
      'ngInject';
      this.DataService = DataService;
      this.restUrl = restUrl;
      this.Message = Message;

      this.tiposProvincias = [];
      this.tiposMunicipios = [];
      this.idDepartamento = null ;
      this.idProvincia = null;
      this.idMunicipio = null;
    }

    $onInit() {

        this.ngRequired = this.ngRequired != 'true' || angular.isUndefined(this.ngRequired) ? false : true;
        this.ngDisabled = this.ngDisabled != 'true' || angular.isUndefined(this.ngDisabled) ? false : true;
        this.field = angular.isUndefined(this.field)? 'nombre' : this.field;
        this.placeholder = angular.isUndefined(this.placeholder)? 'Seleccione ...' : this.placeholder;
    }
    /**
     * onSelect - Método que captura el evento del elemento seleccionado
     *
     * @param {object} itemSeleccionado
     *
     * @memberof CSelectDPAController
     */
    onSelectDepartamento(itemSeleccionado){
     // this.ngModel.provincia = itemSeleccionado;
      this.ngModel.provincia = null;
      this.tiposMunicipios=[];
      this.idDepartamento = itemSeleccionado.id_dpa;
        this.DataService.get(this.restUrl+'dpa/'+this.idDepartamento+'/provincias')
          .then(response => {
            if(response && response.datos){
              this.tiposProvincias = response.datos;
            }else{
              this.Message.error('Ocurrio un error al recuperar tipos de Provincias');
            }
          });
    }
    onSelectProvincia(itemSeleccionado){
     // this.ngModel.provincia.municipio = null;
      this.ngModel.provincia = itemSeleccionado;
     // this.ngModel.provincia.idMunicipio = itemSeleccionado;
      this.idProvincia = itemSeleccionado.id_dpa;
        this.DataService.get(this.restUrl+'dpa/'+this.idDepartamento+'/provincias/'+this.idProvincia+'/municipios')
          .then(response => {
            if(response && response.datos){
              this.tiposMunicipios = response.datos;
            }else{
              this.Message.error('Ocurrio un error al recuperar tipos de Provincias');
            }
          });
    }
   // onSelectMunicipio(itemSeleccionado){
    ////  this.ngModel.provincia.idMunicipio = itemSeleccionado;
  //    console.log(itemSeleccionado);
  //  }
}
export default CSelectDPAController;
