'use strict';

import controller from './c-radiobutton.controller';

const CRadioButtonComponent = {
  bindings: {
          ngModel: '=',
          name: '@',
          label: '@',
          ngDisabled: '=?',
          ngRequired: '@',
          options: '='
        },
  require: {
          form: '^form',
        },
  template: `
  <div class="">
     <small class="form-text text-muted text-info" ng-class="{'requerido':$ctrl.ngRequired}">
        {{$ctrl.label}}
     </small>
      <div ng-repeat="option in $ctrl.options">
        <label class="custom-control custom-radio">
          <input type="radio" name="{{$ctrl.name}}" ng-model="$ctrl.ngModel" value="{{option.clave}}" class="custom-control-input"
          ng-required="$ctrl.ngRequired" ng-disabled="$ctrl.ngDisabled">
          <span class="custom-control-indicator"></span>
           <span class="custom-control-description">{{option.valor}}</span>
        </label>
    </div>
     <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger font-weight-bold">
             El campo es requerido.
          </small>
        </div>
      </div>
  </div>
  `,
  controller
};

export default CRadioButtonComponent;
