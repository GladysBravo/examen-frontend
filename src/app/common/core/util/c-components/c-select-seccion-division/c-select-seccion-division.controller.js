'use strict';

class CSelectSeccionDivisionController {
    constructor(DataService,restUrl,Message) {
      'ngInject';
      this.DataService = DataService;
      this.restUrl = restUrl;
      this.Message = Message;

      this.tiposDivisiones = [];
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
     * @memberof CSelectSeccionDivisionController
     */
    onSelect(itemSeleccionado){
      this.ngModel.division = null;

      let idClave = itemSeleccionado.clave;
        this.DataService.get(this.restUrl+'parametro/ciiu/seccion/'+idClave+'/division')
          .then(response => {
            if(response && response.datos){
              this.tiposDivisiones = response.datos.rows;
            }else{
              this.Message.error('Ocurrio un error al recuperar tipos de Divisiones');
            }
          });
    }
    onSelectDivision(itemSeleccionado){
      this.ngModel.division = itemSeleccionado;
      let count = 0;
      angular.forEach(this.reservados,(reservado) => {
        if(reservado !=null){
            if(itemSeleccionado.clave == reservado.division.clave){
              count++;
              if(count > 1){
                this.ngModel.division = null;
                this.Message.error('Debe elegir otro tipo de Grupo de Actividad');
              }
            }
        }
      });
    }
}
export default CSelectSeccionDivisionController;
