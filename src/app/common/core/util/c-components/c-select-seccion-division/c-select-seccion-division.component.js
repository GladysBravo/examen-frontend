'use strict';

import controller from './c-select-seccion-division.controller';
//import './ui-select.scss';
const CSelectSeccionDivisionComponent = {
  bindings: {
          ngModel: '=',
          ngDisabled: '=',
          ngRequired: '@',
          name: '@',
          label: '@',
          placeholder: '@?',
          options: '<',
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
                     on-select="$ctrl.onSelect($item)"
                     ng-model="$ctrl.ngModel"
                     theme="bootstrap"
                     class="md-select"
                     ng-required="$ctrl.ngRequired"
                     ng-disabled="$ctrl.ngDisabled"
                     my-ui-select>
            <ui-select-match placeholder="Seleccione Sección">{{$select.selected[$ctrl.field]}}</ui-select-match>
            <ui-select-choices repeat="item in $ctrl.options | filter: $select.search">
              <span ng-bind-html="item[$ctrl.field] | highlight: $select.search"></span>
              </ui-select-choices>
              <ui-select-no-choice>
              <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
                Actividad no encontrada
              </small>
              </ui-select-no-choice>
           </ui-select>
          <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">Sección de Clasificación</label>
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
                   ng-model="$ctrl.ngModel.division"
                   theme="bootstrap"
                   class="md-select"
                   ng-required="$ctrl.ngRequired"
                   ng-disabled="$ctrl.ngDisabled">
          <ui-select-match placeholder="Seleccione División">{{$select.selected[$ctrl.field]}}</ui-select-match>
          <ui-select-choices repeat="item in $ctrl.tiposDivisiones | filter: $select.search">
            <span ng-bind-html="item[$ctrl.field] | highlight: $select.search"></span>
          </ui-select-choices>
          <ui-select-no-choice>
            <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
              Division no encontrada
            </small>
          </ui-select-no-choice>
        </ui-select>
        <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">División de Clasificación</label>
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

export default CSelectSeccionDivisionComponent;
