'use strict';

import modalController from './crud-table.modal.controller';
import modalTemplate from './crud-table.modal.html';

class CrudTableController {

    constructor(DataService, NgTableParams, Modal, $log) {
        'ngInject';

        this.DataService = DataService;
        this.NgTableParams = NgTableParams;
        this.Modal = Modal;
        this.$log = $log;
    }

    $onInit () {
        this.getFields();
    }

    getFields() {
        this.DataService.options(this.url)
        .then(response => {
            this.fields = response;
            this.$log.log('fields:', this.fields);
            this.setHeaders(response);            
            this.getData();
        });
    }

    setHeaders(fields) {
        let headers = [];            
        for (let field of fields) {
            headers.push({ 
                field: field.key, 
                title: field.templateOptions.label, 
                headerTitle: field.templateOptions.label, 
                show: true 
            });
        }
        this.headers = headers;
    }

    getData() {
        this.tableParams = new this.NgTableParams({}, { 
            getData: params => {
                // console.log(params);
                this.$log.log('params.url():', params.url());
                return this.DataService.get(this.url)
                .then(response => {
                    if (response.results) {                   
                        params.total(response.count);
                        this.$log.log('fields:', response);
                        return response.results;
                    }
                });
            }
        });
    }

    add() {
        this.Modal.show({
            template: modalTemplate,
            controller: modalController,
            data: {
                fields: this.fields,
                url: this.url,
                title: this.title
            }
        });
    }
}

export default CrudTableController;