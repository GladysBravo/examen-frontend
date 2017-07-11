'use strict';

import controller from './c-input-chips.controller';
import './c-input.chips.scss';
const CInputChipsComponent = {
  bindings:{
    ngModel: '=',
    ngRequired: '@',
    ngValidation: '@',
    placeholder: '@',
    label: '@',
    maxTags: '@',
    minLength: '@',
    maxLength: '@',
    name:'@'
  },
   require: {
    form: '^form',
  },
  template: `
     <div class="md-form-group">
      <tag-me
        name="{{$ctrl.name}}"
        type="input"
        selected="$ctrl.ngModel"
        placeholder="{{$ctrl.placeholder}}"
        display-field="name"
        typehead="false"
        allow-outside-data-set="true"
        same-input="false"
        max="$ctrl.maxTags"
        max-length="{{maxLength}}"
        min-length="{{minLength}}"
        validation="$ctrl.validation"
        required="$ctrl.ngRequired"
        theme="material">
      </tag-me>
        <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" style="top:-1rem;font-size:10px;">{{$ctrl.label}}</label>
         <i class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></i>
       <div class="row">
        <div class="col-md-6">
          <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger font-weight-bold">
             El campo es requerido.
          </small>
        </div>
         <div ng-message="pattern">
           <small class="form-text text-muted text-danger font-weight-bold font-weight-bold">
             {{$ctrl.messageErrorPattern}}
            </small>
        </div>
         <div ng-message="minlength">
            <small class="form-text text-muted text-danger font-weight-bold font-weight-bold">
             El contenido es muy corto.
            </small>
        </div>
         <div ng-message="maxlength">
            <small class="form-text text-muted text-danger font-weight-bold font-weight-bold">
             El contenido es muy largo.
            </small>
        </div>
      </div>
        </div>
        <div class="col-md-6">
          <div>
           <small class="form-text text-muted pull-right">
            Número máximo de elementos: {{$ctrl.maxTags}}
            </small>
        </div>
        </div>
       </div>
     </div>
  `,
  controller
};

export default CInputChipsComponent;
