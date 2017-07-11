'use strict';

import controller from './c-select-grupo-clase.controller';
//import './ui-select.scss';
const CSelectGrupoClaseComponent = {
  bindings: {
          ngModel: '=',
          ngDisabled: '=',
          ngRequired: '@',
          name: '@',
          label: '@',
          placeholder: '@?',
          field: '@',
          index:'@',
          reservados:'='
  },
  require: {
    form: '^form',
  },
  template: `
  <div class="row">
    <div class="col-md-6 mt-0 pt-0">
        <div class="md-form-group espacio-comprimido md-select-group" md-event-label>
          <ui-select name="{{$ctrl.name}}"
                     on-select="$ctrl.onSelectGrupo($item)"
                     ng-model="$ctrl.ngModel.grupo"
                     theme="bootstrap"
                     class="md-select"
                     ng-required="$ctrl.ngRequired"
                     ng-disabled="$ctrl.ngDisabled">
            <ui-select-match placeholder="Seleccione Grupo">{{$select.selected.valor}}</ui-select-match>
            <ui-select-choices repeat="item in $ctrl.options | filter: $select.search">
              <span ng-bind-html="item.valor | highlight: $select.search"></span>
            </ui-select-choices>
            <ui-select-no-choice>
            <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
              Grupo no encontrado
            </small>
            </ui-select-no-choice>
          </ui-select>
          <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">Grupo de Clasificación</label>
          <i class="md-bar"></i>

          <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched" role="alert">
            <div ng-message="required" ng-if="$ctrl.ngRequired=='true'">
              <small class="form-text text-muted text-danger">
                    El campo es requerido.
                  </small>
            </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-0 pt-0 ">
      <div class="md-form-group espacio-comprimido md-select-group" md-event-label>
        <ui-select name="division"
                   on-select="$ctrl.onSelectDivision($item)"
                   ng-model="$ctrl.ngModel.grupo.clase"
                   theme="bootstrap"
                   class="md-select"
                   ng-required="$ctrl.ngRequired"
                   ng-disabled="$ctrl.ngDisabled">
          <ui-select-match placeholder="Seleccione clase">{{$select.selected.valor}}</ui-select-match>
          <ui-select-choices repeat="item in $ctrl.tiposClases| filter: $select.search">
            <span ng-bind-html="item.valor | highlight: $select.search"></span>
          </ui-select-choices>
          <ui-select-no-choice>
          <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
            Clase no encontrada
          </small>
          </ui-select-no-choice>
        </ui-select>
        <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">Clase de Clasificación</label>
        <i class="md-bar"></i>

        <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched" role="alert">
          <div ng-message="required" ng-if="$ctrl.ngRequired=='true'">
            <small class="form-text text-muted text-danger">
                  El campo es requerido.
            </small>
          </div>
          <div ng-if="$ctrl.ngModel && !$ctrl.ngModel.division">
            <small class="form-text text-muted text-danger">
                Debe elegir el Grupo de la División.
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
    `,
  controller
};

export default CSelectGrupoClaseComponent;
