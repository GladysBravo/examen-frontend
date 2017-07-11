'use strict';

class LocalizacionModalController {
    constructor($uibModalInstance, data) {
        'ngInject';

        this.data = data;
        this.$uibModalInstance = $uibModalInstance;
    }

    $onInit() {

    }

    ok() {
        this.$uibModalInstance.close(this.selected.item);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default LocalizacionModalController;
