'use strict';

class CSelectSeccionDivisionController {
    constructor(DataService,restUrl,Message) {
      'ngInject';
      this.DataService = DataService;
      this.restUrl = restUrl;
      this.Message = Message;

      this.tiposClases = [];
    }

    $onInit() {
        this.DataService.get(this.restUrl+'parametro/ciiu/seccion/a/division/'+this.ngModel.division+'/grupo')
          .then(response =>{
            this.options = response.datos.rows;
          });

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
     * @memberof CSelectSeccionDivisionController
     */
    onSelectGrupo(itemSeleccionado){
      this.ngModel.grupo.clase = null;

      let idClave = itemSeleccionado.clave;
        this.DataService.get(this.restUrl+'parametro/ciiu/seccion/a/division/b/grupo/'+idClave+'/clase')
          .then(response => {
            if(response && response.datos){
              this.tiposClases = response.datos.rows;
            }else{
              this.Message.error('Ocurrio un error al recuperar tipos de Grupos');
            }
          });
    }
    onSelectClase(itemSeleccionado){
      this.ngModel.grupo.clase = itemSeleccionado;
    }
}
export default CSelectSeccionDivisionController;
