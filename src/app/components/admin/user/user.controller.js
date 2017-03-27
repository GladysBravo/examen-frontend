'use strict';

class UserController {
    constructor() {
        'ngInject';
    }

    $onInit() {
        this.url = 'rest/users';
        this.title = 'Usuario';
    }
}

export default UserController;