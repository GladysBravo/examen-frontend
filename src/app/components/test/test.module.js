'use strict';

import testComponent from './test.component';

const Test = angular
.module('app.test', [])
.component('test', testComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('solicitudes', {
      url: '/solicitudes',
      component: 'test'
    });
  $urlRouterProvider.otherwise('/');
})
.name;

export default Test;
