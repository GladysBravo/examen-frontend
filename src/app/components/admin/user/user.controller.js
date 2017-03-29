'use strict';

class UserController {
    constructor() {
        'ngInject';
    }

    $onInit() {
        this.url = 'rest/users/';
        this.title = 'Usuario';

        /**
         * Campos para el listado de la tabla del crud-table
         * @type {Array}
         */
        this.fields = [
            'id_user',
            'username',
            'first_name',
            'last_name',
            'email',
            'ci',
            'birthday',
            'phone'
        ];

        /**
         * Campos para el formulario de adición del crud-table
         * @type {Array}
         */
        this.fieldsCreate = [
            'id_user',
            'username',
            'password',
            'first_name',
            'last_name',
            'email',
            'ci',
            'birthday',
            'phone'
        ];
    }
}

export default UserController;