'use strict';

import modalController from './crud-table.modal.controller';
import modalTemplate from './crud-table.modal.html';

class CrudTableController {

    constructor(DataService, NgTableParams, Modal, CrudTable, Util, ArrayUtil, Message, $log) {
        'ngInject';

        this.DataService = DataService;
        this.NgTableParams = NgTableParams;
        this.Modal = Modal;
        this.Message = Message;
        this.CrudTable = CrudTable;
        this.ArrayUtil = ArrayUtil;
        this.$log = $log;

        this.formlyDefault = [
            {
                key: '',
                templateOptions: {
                    required: false
                },
                hideExpression: 'true'    
            },
            {
                key: 'updatedAt',
                templateOptions: {
                    required: false
                },
                hideExpression: 'true'    
            },
            {
                key: 'createdAt',
                templateOptions: {
                    required: false
                },
                hideExpression: 'true'    
            }
        ];
    }

    $onInit () {
        this.getFields();
    }

    addOptionSelected(data, options) {
        for (let i in data) {
            if (data[i].type == 'select') {
                let item = this.CrudTable.searchField(options, data[i].key);
                if (item) {
                    this.ArrayUtil.insert(data[i].templateOptions.options, 0, {
                        name: item.text || 'Seleccione',
                        value: item.value || ''
                    });
                }
            }
        }
    }

    getFields() {
        this.DataService.options(this.url)
        .then(response => {
            this.fieldsData = this.CrudTable.filterFields(response, this.fields);

            this.idKey = this.CrudTable.getId(this.fieldsData);
            this.formlyDefault[0].key = this.idKey;

            if (this.formly && this.Util.toType(this.formly) == 'array') {
                this.formly = this.CrudTable.addPropertiesFormly(this.formlyDefault, this.formly);
            } else {
                this.formly = this.formlyDefault;
            }

            this.$log.log('formly:', this.formly);
            this.fieldsData = this.CrudTable.addPropertiesFormly(this.fieldsData, this.formly);
            this.addOptionSelected(this.fieldsData, this.optionSelected);
            this.DataService.setFormly(this.fieldsData);

            this.$log.log('fields:', this.fieldsData);
            this.setHeaders(this.fieldsData);
            if (this.editable) {
                this.types = this.CrudTable.getKeys(this.fieldsData);
            }
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

    refresh() {
        this.getData();
    }

    getData() {
        this.tableParams = new this.NgTableParams({}, { 
            getData: params => {
                this.$log.log('params.url():', params.url(), params);
                return this.DataService.list(this.url, {
                    limit: params.url().count,
                    page: params.url().page
                }).then(response => {
                    if (response.results) {                   
                        params.total(response.count);
                        return response.results;
                    }
                });
            }
        });
    }

    add(item) {
        let modalInstance = this.Modal.show({
            template: modalTemplate,
            controller: modalController,
            data: {
                fields: this.fieldsData,
                url: this.url,
                title: this.ngTitle,
                idKey: this.idKey,
                item: item
            }
        });

        modalInstance.result
        .then(data => {
            if (data && data[this.idKey]) {
                this.Message.success();
                this.refresh();
            }
        }, error => {
            this.$log.info('Modal dismissed at: ' + new Date(), error);
        });
    }

    edit(item) {
        this.DataService.get(this.url, item[this.idKey])
        .then(response => {
            if (response) {
                this.$log.log('item!', response);
                if (response) {
                    this.add(response);
                }
            }
        });
    }

    delete() {

    }
}

export default CrudTableController;