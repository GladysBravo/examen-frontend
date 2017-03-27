'use strict';

class AuthService {

    constructor($http, $auth, $location, $rootScope, Storage, SidenavFactory, BreadcrumbFactory, Util, timeSessionExpired) {
        "ngInject";

        this.$http = $http;
        this.$auth = $auth;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.Storage = Storage;
        this.Util = Util;
        this.SidenavFactory = SidenavFactory;
        this.BreadcrumbFactory = BreadcrumbFactory;
        this.timeSessionExpired = timeSessionExpired;
    }

    signin(data) {
        this.$auth.login(data)
        .then((response) => {
            let user = response.data.user;
            let menu = response.data.menu;
            let rol = user.rol;

            this.$rootScope.auth = true;

            // Set user
            this.SidenavFactory.setUser(user);
            this.Storage.setUser(user);

            // Set Menu
            this.SidenavFactory.setMenu(menu);
            this.Storage.set('menu', this.SidenavFactory.getMenu());

            // Set Visible
            this.SidenavFactory.setVisible(true);
            this.Storage.set('visible', this.SidenavFactory.getVisible());

            // Set rol
            this.SidenavFactory.setRol(rol);
            this.Storage.set('rol', this.SidenavFactory.getRol());

            let path = this.Storage.get('path');

            if (path) {
                let route = path.replace('/', '');

                // Set breadcrumb
                let page = this.Util.getMenuOption(this.Storage.get('menu'), route);
                this.BreadcrumbFactory.setParent(page[0]);
                this.BreadcrumbFactory.setCurrent(page[1]);

                // Select menu option
                window.setTimeout(() => {
                    let el = document.querySelector('#sidenav-menu .sidenav-submenu-item.active');
                    if (el) {
                        el.parentNode.parentNode.previousElementSibling.dispatchEvent(new window.Event('click'));
                    }
                }, 1000);
            }

            this.timerSession();                        

            // Redirect to dashboard
            this.$location.path(path && path.indexOf('login') == -1? path : '/');
        });
    }

    timerSession() {
        // Definiendo el tiempo en el que dura una sesión sin actividad
        angular.TIME = this.timeSessionExpired * 60;
        angular.sessionInterval = window.setInterval(function () {
            angular.TIME--;
            if (angular.TIME <= 0) {
                angular.expired = true;
                window.location = '#!/logout';
            }
        }, 1000);
    }

    logout() {
        this.$auth.logout()
        .then(() => {

            if (angular.sessionInterval) {
                window.clearInterval(angular.sessionInterval);
                angular.sessionInterval = null;
            }

            this.Storage.removeUser();
            this.Storage.remove('menu');
            this.Storage.remove('visible');
            // this.Storage.remove('path');

            this.SidenavFactory.setUser({});
            this.SidenavFactory.setMenu([]);
            this.SidenavFactory.setVisible(false);

            if (angular.expired) {
                this.Storage.set('expired', true);
                delete angular.expired;
            }

            this.$location.path('login');
        });
    }
}

export default AuthService;