'use strict';

import controller from './c-input.controller';
import './c-input.scss';
const CInputComponent = {
  bindings: {
      ngModel: '=',
      ngDisabled: '=?',
      ngRequired: '@',
      name: '@',
      label: '@',
      placeholder: '@?',
      ngValidation: '@',
      ngMinlength: '@',
      ngMaxlength: '@',
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
               ng-pattern="$ctrl.validation"
               ng-minlength="$ctrl.ngMinlength",
               ng-maxlength="$ctrl.ngMaxlength"
               ng-placeholder="$ctrl.placeholder"
               name="{{$ctrl.name}}"
               type="text"
               >
        <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" for="input">{{ $ctrl.label }}</label>
        <i class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></i>
      <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger font-weight-bold">
             El campo es requerido.
          </small>
        </div>
        <div ng-message="pattern">
            <small class="form-text text-muted text-danger font-weight-bold">
             {{$ctrl.messageErrorPattern}}
            </small>
        </div>
        <div ng-message="minlength">
            <small class="form-text text-muted text-danger font-weight-bold">
             El contenido es muy corto.
            </small>
        </div>
        <div ng-message="maxlength">
            <small class="form-text text-muted text-danger font-weight-bold">
             El contenido es muy largo.
            </small>
        </div>
    </div>
    </div>`,
  controller

};

export default CInputComponent;
