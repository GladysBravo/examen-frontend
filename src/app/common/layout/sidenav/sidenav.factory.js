'use strict';

const SidenavFactory = function () {

    let factory = {
        user: {
            id: '',
            first_name: '',
            last_name: '',
            cargo: '',
            email: '',
            photo: '',
            nit: ''
        },
        userColor: '',
        menu: [],
        rol: '',
        visible: true,
        getMenu: function () {
            return this.menu;
        },
        getUser: function () {
            return this.user;
        },
        getRol: function () {
            return this.rol;
        },
        getVisible: function () {
            return this.visible;
        },
        setMenu: function (menu) {
            this.menu = menu;
        },
        setUser: function (user) {
            this.user = user;
        },
        setRol: function (rol) {
            this.rol = rol;
        },
        setVisible: function (visible) {
            this.visible = visible;
        }
    };

    return factory;

};

export default SidenavFactory;