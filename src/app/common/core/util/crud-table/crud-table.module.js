'use strict';

import CrudTableComponent from './crud-table.component';
import './crud-table.scss';

const CrudTableModule = angular
    .module('app.crud-table', [])
    .component('crudTable', CrudTableComponent)
    .value('EventEmitter', (payload) => ({ $event: payload }))
    .name;

export default CrudTableModule;