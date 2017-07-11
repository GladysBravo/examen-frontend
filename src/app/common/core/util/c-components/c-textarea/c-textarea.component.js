'use strict';

import controller from './c-textarea.controller';

const CTextareaComponent = {
  bindings:{
          ngModel: '=',
          ngDisabled: '=?',
          ngRequired: '@',
          name: '@',
          label: '@',
          rows: '@?',
          ngMinlength: '@?',
          ngMaxlength: '@?'
  },
  require:{
    form:'^form'
  },
  template:
  `   <div class="md-form-group {{$ctrl.mayuscula}}" md-event-label>
        <textarea ng-required="$ctrl.required || $ctrl.ngRequired"
                  ng-disabled="$ctrl.disabled || $ctrl.ngDisabled"
                  ng-readonly="$ctrl.readonly || $ctrl.ngReadonly"
                  ng-model="$ctrl.ngModel"
                  ng-click="$ctrl.ngClick"
                  ng-change="$ctrl.ngChange"
                  ng-model-options="$ctrl.ngModelOptions"
                  ng-placeholder="$ctrl.placeholder"
                  name="{{$ctrl.name}}"
                  ng-minlength="$ctrl.ngMinlength",
                  ng-maxlength="$ctrl.ngMaxlength"
                  rows="{{$ctrl.rows}}"></textarea>
        <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" for="textarea">{{ $ctrl.label }}</label>
        <i class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></i>
        <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched && !$ctrl.form[$ctrl.name].$valid" role="alert">
              <div ng-message="required">
                <small class="form-text text-muted text-danger font-weight-bold">
                  El campo es requerido.
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
    </div>
  `,
  controller
};

export default CTextareaComponent;
