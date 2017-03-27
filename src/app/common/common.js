'use strict';

// Importando css de las librerías del sistema
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../node_modules/angular-loading-bar/build/loading-bar.css';
import '../../../node_modules/angular-toastr/dist/angular-toastr.min.css';
import '../../../node_modules/ui-select/dist/select.min.css';
import '../../../node_modules/ng-table/bundles/ng-table.min.css';
import './styles/sass/index.scss';
import './styles/postcss/index.css';

// Importando dependencias
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import loadingBar from 'angular-loading-bar';
import ngSanitize from 'angular-sanitize';
import ngResource from 'angular-resource';
import uiSelect from 'ui-select';
import toastr from 'angular-toastr';
// import 'tether'; // Tether (required for Bootstrap 4.x)
import '../../../node_modules/angular-formly/dist/formly';
import '../../../node_modules/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap';
import '../../../node_modules/ng-table/bundles/ng-table';

import Config from './common.config';
import Run from './common.run';

import Lang from './lang/lang.module';
import Core from './core/core.module';
import Layout from './layout/layout.module';

const Common = angular
    .module('app.common', [
        loadingBar,
        ngSanitize,
        ngResource,
        satellizer,
        'formlyBootstrap',
        toastr,
        'ngTable',
        uiRouter,
        uiSelect,
        Lang,
        Core,
        Layout 
    ])
    .config(Config)
    .run(Run)
    .name;

export default Common;