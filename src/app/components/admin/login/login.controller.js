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
    }

    signin() {
        this.Auth.signin({
            username: this.username,
            password: this.password
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