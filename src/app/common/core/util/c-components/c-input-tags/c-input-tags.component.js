'use strict';

import controller from './c-input-tags.controller';
import './c-input.tags.scss';
const CInputTagsComponent = {
  bindings:{
    ngModel: '=',
    ngRequired: '@',
    ngValidation: '@',
    placeholder: '@',
    label: '@',
    maxTags: '@',
    minLength: '@',
    maxLength: '@'
  },
   require: {
    form: '^form',
  },
  template: `
     <div class="md-form-group">
          <tags-input  name="input"
                      class="chips"
                      ng-model="$ctrl.ngModel"
                      placeholder="{{$ctrl.placeholder}}"
                      display-property="name"
                      min-length="{{$ctrl.minLength}}"
                      max-length="{{$ctrl.maxLength}}"
                      on-tag-added="$ctrl.tagAdicionado()"
                      allowed-tags-pattern="{{$ctrl.validation}}"
                      on-invalid-tag="$ctrl.invalidTag($tag)">
             <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" style="top:-1rem;font-size:10px;">{{$ctrl.label}}</label>
             <i class="md-bar mt-0 pt-0"></i>
          </tags-input>
          <div>
          <small class="form-text text-muted text-danger" ng-if="$ctrl.mensajeMaximo && $ctrl.ngModel.length>$ctrl.maxTags-1">
             {{$ctrl.mensajeMaximo}}
          </small>
          <small class="form-text text-muted text-danger" ng-if="$ctrl.mensajeValidacion">
             {{$ctrl.mensajeValidacion}}
          </small>
       </div>
       <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger">
             El campo es requerido.
          </small>
        </div>
      </div>
     </div>


  `,
  controller
};

export default CInputTagsComponent;
