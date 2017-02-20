'use strict';

class UserController {
    constructor(NgTableParams) {
        "ngInject";

        this.NgTableParams = NgTableParams;
    }

    tableParams() {
        return new this.NgTableParams({}, {
            getData: function() {
                
            }
        });
    }
}

export default UserController;