'use strict';

class CSelectCompuestoController {
  constructor(){
    this.tiposAtributos = [
      {
        id:1,
        nombre: 'Caja de Texto'
      },
      {
        id:2,
        nombre: 'Selección simple'
      }
    ];

    this.tiposValidaciones = [
      {
        id:1,
        nombre: 'texto'
      },
      {
        id:2,
        nombre: 'numeros'
      },
      {
        id:3,
        nombre: 'fecha'
      }
    ];
  }

  $onInit(){
      this.isRequired = this.isRequired != 'true' || angular.isUndefined(this.isRequired) ? false : true;
        this.isDisabled = angular.isUndefined(this.isDisabled)? false : this.isDisabled;
        this.field = angular.isUndefined(this.field)? null : this.field;
        this.change = angular.isUndefined(this.change)? null : this.change;
        this.search = angular.isUndefined(this.search)? null : this.search;
        this.placeholder = angular.isUndefined(this.placeholder)? 'Seleccione ...' : this.placeholder;
        this.sizeLabel = angular.isUndefined(this.sizeLabel)? 'col-md-3' : this.sizeLabel;
        this.sizeField = angular.isUndefined(this.sizeField)? 'col-md-5' : this.sizeField;
        this.details = angular.isUndefined(this.extraData)? null : this.extraData.split('.');
        this.extraName = angular.isUndefined(this.extraName)? null : this.extraName + ': ';
        this.extraFilter = 'lowercase';
  }

  tagAdicionado(tag){
    let id_tag = this.options.length;
    tag.id = id_tag;
  }
}

export default CSelectCompuestoController;
