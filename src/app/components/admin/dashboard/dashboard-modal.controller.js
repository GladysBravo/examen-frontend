'use strict';

class DashboardModalController {
    constructor($uibModalInstance, data) {
        'ngInject';
        
        this.items = data;
        this.$uibModalInstance = $uibModalInstance;
    }

    $onInit() {
        this.selected = {
            item: this.items[0]
        };
    }

    ok() {
        this.$uibModalInstance.close(this.selected.item);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default DashboardModalController;