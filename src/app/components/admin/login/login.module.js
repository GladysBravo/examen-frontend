'use strict';

import LoginComponent from './login.component';
import AuthService from './auth.service';
import './login.css';

const Login = angular
    .module('app.login', [])
    .service('Auth', AuthService)
    .component('appAdminLogin', LoginComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('login', {
                url: '/login',
                component: 'appAdminLogin'
            })
            .state('logout', {
                url: '/logout',
                controller: (Auth) => {
                    Auth.logout();
                }
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Login;