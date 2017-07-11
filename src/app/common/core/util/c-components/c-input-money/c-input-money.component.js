'use strict';

import controller from './c-input-money.controller';
const CInputMoneyComponent = {
  bindings: {
      ngModel: '=',
      ngDisabled: '=?',
      ngRequired: '@',
      name: '@',
      label: '@',
      placeholder: '@?',
      ngValidation: '@',
      ngMinvalue: '@',
      ngMaxvalue: '@',
  },
  require: {
    form: '^form',
  },
  transclude:true,
  template: `
     <div class="md-form-group espacio-comprimido ml-1  {{$ctrl.mayuscula}}" md-event-label>
        <input ng-required="$ctrl.required || $ctrl.ngRequired"
               ng-disabled="$ctrl.ngDisabled"
               ng-readonly="$ctrl.readonly || $ctrl.ngReadonly"
               ng-model="$ctrl.ngModel"
               ng-maxlength="$ctrl.ngMaxlength"
               ng-placeholder="$ctrl.placeholder"
               name="{{$ctrl.name}}"
               type="text"
               numerico
               min="$ctrl.ngMinvalue"
               max="$ctrl.ngMaxvalue"
               >
        <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" for="input">{{ $ctrl.label }}</label>
        <i class="md-bar"></i>
      <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger font-weight-bold">
             El campo es requerido.
          </small>
        </div>
        <div ng-message="maxlength">
            <small class="form-text text-muted text-danger font-weight-bold">
             El contenido es muy largo.
            </small>
        </div>
        <div ng-message="nombre">
            <small class="form-text text-muted text-danger font-weight-bold">
             El texto no debe contener .{{}}
            </small>
        </div>
    </div>
    </div>`,
  controller

};

export default CInputMoneyComponent;
