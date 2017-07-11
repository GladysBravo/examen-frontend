'use strict';

import controller from './c-select-dpa.controller';
//import './ui-select.scss';
const CSelectDPAComponent = {
  bindings: {
          ngModel: '=',
          ngDisabled: '=',
          ngRequired: '@',
          name: '@',
          label: '@',
          options: '<',
          field: '@',
          onSelectMunicipio: '&',
  },
  require: {
    form: '^form',
  },
  template: `
  <div class="row">
    <div class="col-md-4">
        <div class="md-form-group espacio-comprimido md-select-group " md-event-label>
          <ui-select name="{{$ctrl.name}}"
                     on-select="$ctrl.onSelectDepartamento($item)"
                     ng-model="$ctrl.ngModel"
                     theme="bootstrap"
                     class="md-select"
                     spinner-enabled="true"
                     ng-required="$ctrl.ngRequired"
                     ng-disabled="$ctrl.ngDisabled">
            <ui-select-match placeholder="Seleccione Departamento">{{$select.selected[$ctrl.field]}}</ui-select-match>
            <ui-select-choices repeat="item in $ctrl.options | filter: $select.search">
              <span ng-bind-html="item[$ctrl.field] | highlight: $select.search"></span>
            </ui-select-choices>
            <ui-select-no-choice>
            <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
              Departamento no encontrado
            </small>
            </ui-select-no-choice>
          </ui-select>
          <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">Departamento</label>
          <i class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></i>
          </div>
          <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched" role="alert">
            <div ng-message="required" ng-if="$ctrl.ngRequired=='true'">
              <small class="form-text text-muted text-danger font-weight-bold">
                    El campo es requerido.
                  </small>
            </div>
        </div>

    </div>
    <div class="col-md-4">
      <div class="md-form-group espacio-comprimido md-select-group " md-event-label>
        <ui-select name="Provincia"
                  on-select="$ctrl.onSelectProvincia($item)"
                   ng-model="$ctrl.ngModel.provincia"
                   theme="bootstrap"
                   class="md-select"
                   ng-required="$ctrl.ngRequired"
                   ng-disabled="$ctrl.ngDisabled">
          <ui-select-match placeholder="Seleccione Provincia">{{$select.selected.provincia}}</ui-select-match>
          <ui-select-choices repeat="item in $ctrl.tiposProvincias | filter: $select.search">
            <span ng-bind-html="item.provincia | highlight: $select.search"></span>
          </ui-select-choices>
          <ui-select-no-choice>
          <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
            Provincia no encontrada
          </small>
          </ui-select-no-choice>
        </ui-select>
        <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">Provincia</label>
        <i class="md-bar" ng-class="{'error':$ctrl.form.Provincia.$invalid && $ctrl.form.Provincia.$touched,'sin-error':!$ctrl.form.Provincia.$invalid}"></i>
        </div>
        <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched" role="alert">
            <div ng-message="required" ng-if="$ctrl.ngRequired=='true'">
              <small class="form-text text-muted text-danger font-weight-bold">
                    El campo es requerido.
              </small>
            </div>
            <div ng-if="$ctrl.ngModel && !$ctrl.ngModel.provincia">
            <small class="form-text text-muted text-danger font-weight-bold">
                Debe elegir la Provincia.
            </small>
          </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="md-form-group espacio-comprimido md-select-group" md-event-label>
          <ui-select name="Municipio"
                     on-select="$ctrl.onSelectMunicipio({item:$item})"
                     ng-model="$ctrl.ngModel.provincia.municipio"
                     theme="bootstrap"
                     class="md-select"
                     ng-required="$ctrl.ngRequired"
                     ng-disabled="$ctrl.ngDisabled">
            <ui-select-match placeholder="Seleccione Municipio">{{$select.selected.municipio}}</ui-select-match>
            <ui-select-choices repeat="item in $ctrl.tiposMunicipios | filter: $select.search">
              <span ng-bind-html="item.municipio | highlight: $select.search"></span>
            </ui-select-choices>
            <ui-select-no-choice>
            <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
              Municipio no encontrado
            </small>
            </ui-select-no-choice>
          </ui-select>
          <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">Municipio</label>
          <i class="md-bar" ng-class="{'error':$ctrl.form.Municipio.$invalid && $ctrl.form.Municipio.$touched,'sin-error':!$ctrl.form.Municipio.$invalid}"></i>
           </div>
          <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched" role="alert">
            <div ng-message="required" ng-if="$ctrl.ngRequired=='true'">
              <small class="form-text text-muted text-danger font-weight-bold">
                    El campo es requerido.
              </small>
            </div>
            <div ng-if="$ctrl.ngModel.provincia && !$ctrl.ngModel.provincia.municipio">
            <small class="form-text text-muted text-danger font-weight-bold">
                Debe elegir el Municipio.
            </small>
          </div>
      </div>
    </div>
  </div>
    `,
  controller
};

export default CSelectDPAComponent;
