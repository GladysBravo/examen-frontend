'use strict';

import CrudTableComponent from './crud-table.component';

const CrudTableModule = angular
    .module('app.crud-table', [])
    .component('crudTable', CrudTableComponent)
    .value('EventEmitter', (payload) => ({ $event: payload }))
    .name;

export default CrudTableModule;