'use strict';

import modalController from './crud-table.modal.controller';
import modalTemplate from './crud-table.modal.html';

class CrudTableController {

    constructor($scope, DataService, NgTableParams, Modal, CrudTable, Util, ArrayUtil, Message, $log) {
        'ngInject';

        this.$scope = $scope;
        this.DataService = DataService;
        this.NgTableParams = NgTableParams;
        this.Modal = Modal;
        this.Message = Message;
        this.Util = Util;
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

        this.showFilter = true;
    }

    renderLabels(params) {
        setTimeout(() => {
            document.querySelector('.ng-table-counts').setAttribute('data-content', 'Filas: ');
            document.querySelector('.ng-table-pagination').setAttribute('data-content', `${params.ini} al ${params.end} de ${params.total} Registros.`);
            document.querySelector('.ng-table-filters .filter:last-child').setAttribute('data-content', 'Acciones');
        }, 100);
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
            let fields = response;

            this.fieldsData = this.CrudTable.filterFields(fields, this.fields);
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

            /**
             * Campos para el formulario de adición
             */
            if (this.Util.toType(this.fieldsCreate) == 'array') {
                this.fieldsCreate = this.CrudTable.filterFields(fields, this.fieldsCreate);
                this.fieldsCreate = this.CrudTable.addPropertiesFormly(this.fieldsCreate, this.formly);
            }

            /**
             * Campos para el formulario de actualización
             */
            if (this.Util.toType(this.fieldsUpdate) == 'array') {
                this.fieldsUpdate = this.CrudTable.filterFields(fields, this.fieldsUpdate);
                this.fieldsUpdate = this.CrudTable.addPropertiesFormly(this.fieldsUpdate, this.formly);
            }

            /**
             * Campos para el formulario de adición/actualización
             */
            if (this.Util.toType(this.fieldsSave) == 'array') {
                this.fieldsSave = this.CrudTable.filterFields(fields, this.fieldsSave);
                this.fieldsSave = this.CrudTable.addPropertiesFormly(this.fieldsSave, this.formly);
            }
        });
    }

    setHeaders(fields) {
        let headers = [];            
        for (let field of fields) {
            headers.push({
                field: field.key, 
                title: field.templateOptions.label, 
                headerTitle: field.templateOptions.label,
                sortable: field.key,
                filter: { [field.key] : field.templateOptions.type },
                show: field.key != this.idKey 
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
                let data = params.url();
                let query = {
                    limit: data.count,
                    page: data.page,
                };
                let sort = this.getSorting(data);
                if (sort) {
                    query.order = sort;
                }
                let filters = this.getFilters(data);
                if (filters.length) {
                    if (filters[0].crudtable_search_term) {
                        query.filter = filters[0].crudtable_search_term;
                    } else {
                        for (let i in filters) {
                            let key = Object.keys(filters[i])[0];
                            query[key] = filters[i][key];
                        }
                        // query.filter = JSON.stringify(filters);
                    }
                }

                this.$log.log('data:', data);
                return this.DataService.list(this.url, query)
                .then(response => {
                    if (response.results) {
                        params.total(response.count);
                        let items = this.filterItems(response.results);
                        this.renderLabels({
                            ini: (query.page - 1) * query.limit + 1,
                            end: query.page * query.limit < response.count ? query.page * query.limit : response.count,
                            total: response.count
                        });
                        return items;
                    }
                });
            }
        });
    }

    getSorting(params) {
        for (let key in params) {
            if (key.indexOf('sorting') != -1) {
                return (params[key] == 'desc' ? "-" : "") + this.removeCorchete(key, 'sorting');
            }
        }
        return null;
    }

    getFilters(params) {
        let filters = [];
        for (let key in params) {
            if (key.indexOf('filter') != -1) {
                filters.push({ [this.removeCorchete(key, 'filter')] : params[key] });
            }
        }
        return filters;
    }

    removeCorchete(string, search) {
        return string.replace(`${search}[`, '').replace(']', '');
    }

    filterItems(data) {
        let fields = this.fields !== undefined;
        let fks = this.fks !== undefined;
        let relations = this.relations !== undefined;
        let array = [];
        for (let i in data) {
            for (let j in data[i]) {
                if (fields && this.fields.indexOf(j) == -1) {
                    delete data[i][j];
                } else {
                    if (this.editable === undefined) {
                        if (typeof data[i][j] == 'boolean') {
                            data[i][j] = data[i][j] ? 'check_circle_success' : 'check_circle_gray';
                        } else if (relations && this.relations[j]) {
                            data[i][j] = this.CrudTable.searchFieldData(this.relations[j], data[i][j]);
                        } else if (fks && this.fks.indexOf(j) != -1) {
                            if (this.Util.toType(data[i][j]) == 'array') {
                                let l = this.CrudTable.lengthOptions(this.fieldsData, j);
                                if (l > 1 && l == data[i][j].length) {
                                    data[i][j] = 'Todos';
                                } else {
                                    let text = [];
                                    for (let e of data[i][j]) {
                                        text.push(this.CrudTable.getFkData(this.fieldsData, j, e)); 
                                    }
                                    data[i][j] = text.join(', ');
                                }
                            } else {
                                data[i][j] = this.CrudTable.getFkData(this.fieldsData, j, data[i][j]);
                            }
                        } else if (this.Util.toType(data[i][j]) == 'array') {
                            data[i][j] = data[i][j][0];
                        }
                    }
                }
            }
            array.push(this.orderItem(data[i], this.fieldsData, i));
        }
        return array;
    }

    orderItem(data, fields, pos) {
        if (fields === undefined || fields.length === 0) {
            return data;
        }

        let item = {};
        for (let i in fields) {
            let field = fields[i].key;
            if (data[field] !== undefined) {
                if (this.editable) {
                    if (typeof data[field] == 'string' && !/[a-zA-Z]+/g.test(data[field]) && /^-?[0-9.]+\-?[0-9]+\-?[0-9]*$/g.test(data[field]) && data[field].length == 10) {
                        let date = data[field].split('-');
                        this.dataGrid[pos + '_' + field] = new Date(date[0], date[1]-1, date[2]);
                    } else {
                        this.dataGrid[pos + '_' + field] = data[field];
                    }
                    item[field] = pos + '_' + field;
                } else {
                    item[field] = data[field];
                }
            }
        }

        return item;
    }

    add(item) {
        let fields = null;
        if (item) {
            fields = this.fieldsSave || this.fieldsUpdate || this.fieldsData;
        } else {
            fields = this.fieldsSave || this.fieldsCreate || this.fieldsData;
        }

        let modalInstance = this.Modal.show({
            template: modalTemplate,
            controller: modalController,
            data: {
                fields: fields,
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
                this.add(response);
            }
        });
    }

    delete(item) {
        this.Modal.confirm('¿Deséa eliminar este registro?', () => {            
            this.DataService.delete(this.url, item[this.idKey])
            .then(() => {
                this.Message.success('Su registro fue eliminado correctamente.');
                this.refresh();                
            });
        });
    }

    search() {
        this.tableParams.filter({ 'crudtable_search_term': this.searchTerm });
    }

    cleanSearch() {
        this.searchTerm = '';
        this.refresh();
    }

}

export default CrudTableController;