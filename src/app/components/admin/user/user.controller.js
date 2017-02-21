'use strict';

class UserController {
    constructor(NgTableParams, DataService, ngTableSimpleList) {
        "ngInject";

        this.NgTableParams = NgTableParams;
        this.DataService = DataService;
        this.ngTableSimpleList = ngTableSimpleList;
    }

    $onInit() {
        this.tableParams();
    }

    tableParams() {
        return new this.NgTableParams({}, {
            dataset: this.ngTableSimpleList
        });
    }
}

export default UserController;