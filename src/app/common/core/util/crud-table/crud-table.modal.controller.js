'use strict';

class CrudTableModalController {
    constructor($uibModalInstance, data, DataService) {
        'ngInject';
        
        this.fields = data.fields;
        this.url = data.url;
        this.title = data.title;
        this.DataService = DataService;
        this.$uibModalInstance = $uibModalInstance;
    }

    $onInit() {
        this.options = {
            formState: {
                
            }
        };
    }

    save() {
        console.log('Modelo!', this.model);
        this.DataService.post(this.url, this.model)
        .then(response => {
            if (response) {
                this.$uibModalInstance.close(this.model);
            }
        });
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default CrudTableModalController;