'use strict';

import registroComponent from './registro.component';

const registro = angular
.module('app.registro', [])
.component('registro', registroComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('registro', {
      url: '/registro',
      component: 'registro'
    });
  $urlRouterProvider.otherwise('/');
})
.name;

export default registro;
