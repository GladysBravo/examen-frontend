'use strict';

import Admin from './admin/admin.module';

const Components = angular
    .module('app.components', [
        Admin
    ])
    .name;

export default Components;