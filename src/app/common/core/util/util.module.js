'use strict';

import CrudTable from './crud-table/crud-table.module';
import Material from './material/material.module';

const Components = angular
    .module('app.util', [
        CrudTable,
        Material
    ])
    .name;

export default Components;