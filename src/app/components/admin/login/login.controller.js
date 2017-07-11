'use strict';

class LoginController {

    constructor($rootScope, Storage, Message, timeSessionExpired, Auth) {
        'ngInject';
        
        this.$rootScope = $rootScope;
        this.Storage = Storage;
        this.Message = Message;
        this.Auth = Auth;
        this.timeSessionExpired = timeSessionExpired;
    }

    $onInit() {
        this.$rootScope.auth = false;

        if (this.Storage.exist('expired')) {
            this.Message.warning('Su sesión ha sido cerrada automáticamente después de ' + this.timeSessionExpired + ' minutos de inactividad.', null, 0);
            this.Storage.destroy('expired');
        }
        if (this.Storage.exist('menu') && this.Storage.existUser() && this.Storage.exist('token') && this.Storage.getUser().estado=='ACTIVO') {
            this.$rootScope.auth = true;
            this.$location.path(this.Storage.getUser().pathInicio);
        }
    }

    signin() {
        this.Auth.signin({
            username: this.username,
            password: this.password,
            path: 'dashboard', // Indica donde se redireccionará cuando se haya iniciado sesión (Opcional, por defecto es 'dashboard')
            pathLogin: 'login', // Indica donde tiene que redireccionará cuando se haya cerrado sesión (Opcional, por defecto es 'login')
            menu: true, // Indica si será visible el Menú de opciones cuando se inicie sesión (Opcional, por defecto es true)
            sidenav: true // Indica si será visible el Sidenav cuando se inicie sesión (Opcional, por defecto es true)
        });
    }

    recovery() {
        this.flip = true;
    }

    goLogin() {
        this.flip = false;
    }
}

export default LoginController;