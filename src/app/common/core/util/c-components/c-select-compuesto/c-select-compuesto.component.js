'use strict';

import controller from './c-select-compuesto.controller';
import './ngTags.scss';
const CSelectCompuestoComponent = {
  bindings:{
          model: '=',
          options: '=',
          name: '@',
          isDisabled: '=?',
          isRequired: '@',
          tipo: '='
  },
  template: `
  <div>
      <div class="md-form-group espacio-comprimido md-select-group pt-0 mt-0 pb-0 mb-0">
          <ui-select name="{{$ctrl.name}}" ng-model="$ctrl.tipo" theme="bootstrap" class="md-select" ng-required="$ctrl.isRequired">
            <ui-select-match placeholder="Tipo de atributo">{{$select.selected.nombre}}</ui-select-match>
            <ui-select-choices repeat="item in $ctrl.tiposAtributos | filter: $select.search">
              <span ng-bind-html="item.nombre | highlight: $select.search"></span>
            </ui-select-choices>
          </ui-select>
          <label form="input" class="md-control-label"></label>
          <i class="md-bar"></i>
      </div>


      <div class="md-form-group espacio-comprimido md-select-group pt-0 mt-0 pb-0 mb-0">
            <ui-select name="validaciones" ng-model="$ctrl.model" theme="bootstrap" ng-required="$ctrl.isRequired" class="md-select" ng-if="$ctrl.tipo.id==1">
            <ui-select-match placeholder="Tipo de validación">{{$select.selected.nombre}}</ui-select-match>
            <ui-select-choices repeat="item in $ctrl.tiposValidaciones | filter: $select.search">
              <span ng-bind-html="item.nombre | highlight: $select.search"></span>
            </ui-select-choices>
            </ui-select>
            <label form="input" class="md-control-label"></label>
            <i class="md-bar"></i>
      </div>

      <div class="md-form-group" ng-if="$ctrl.tipo.id==2">
          <tags-input class="chips" ng-model="$ctrl.options" placeholder="Adicione item" display-property="name" on-tag-added="$ctrl.tagAdicionado($tag)">
 <i class="md-bar mt-0 pt-0"></i>
          </tags-input>



      </div>
  </div>
  `,
  controller
};

export default CSelectCompuestoComponent;
